"use server"
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getJudge0LanguageName, pollBatchResults, submitBach } from "@/lib/judge0";
import * as fs from "fs";

export const getAllProblems = async () => {
    try {
        const user = await currentUser();
        const data = await db.user.findUnique({
            where: {
                clerkId: user?.id
            },
            select: {
                id: true
            }
        });

        const problem = await db.problem.findMany({
            include: {
                solvedBy: {
                    where: {
                        userId: data?.id
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return { success: true, data: problem };
    } catch (error) {
        console.error("❌ Error fetching problems: ", error);
        return { success: false, error: "Failed to fetch problems" };
    }
}

export const getProblemById = async (id: string) => {
    try {
        const problem = await db.problem.findUnique({
            where: {
                id: id
            }
        });
        return { success: true, data: problem };
    } catch (error) {
        console.error("❌ Error fetching problem: ", error);
        return { success: false, error: "Failed to fetch problem" };
    }
}

export const deleteProblem = async (id: string) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("unauthorized");

        const dbUser = await db.user.findUnique({
            where: {
                clerkId: user?.id
            },
            select: {
                role: true
            }
        })

        if (dbUser?.role !== UserRole.ADMIN) { throw new Error("Only admin can delete problems") }

        await db.problem.delete({
            where: { id: id }
        });
        revalidatePath("/problems")

        return { success: true, message: "Problem deleted successfully" };
    } catch (error) {
        console.error("❌ Error deleting problem: ", error);
        return { success: false, error: "Failed to delete problem" };
    }
}

export const executeCode = async (
    source_code: string,
    language_id: number,
    stdin: string[],
    expected_outputs: string[],
    id: string
) => {
    try {
        const user = await currentUser();
        if (!user) return { success: false, error: "Unauthorized" };

        const dbUser = await db.user.findUnique({
            where: {
                clerkId: user?.id
            }
        });

        if (!Array.isArray(stdin) || stdin.length === 0 || !Array.isArray(expected_outputs) || expected_outputs.length === 0) {
            return { success: false, error: "Invalid test cases" };
        }

        const submissions = stdin.map((input) => ({
            source_code,
            language_id,
            stdin: input,
            base64_encoded: false,
            wait: false
        }));

        const submitResponse = await submitBach(submissions);
        if (!submitResponse) return { success: false, error: "Submission failed" };

        const tokens = submitResponse.map((res: { token: string }) => res.token);

        const results = await pollBatchResults(tokens);
        if (!results) return { success: false, error: "Failed to poll results" };

        let allPassed = true;
        const detailedResults = results.map((result: {
            stdout?: string;
            stderr?: string;
            compile_output?: string;
            status: { id: number; description: string };
            memory?: number | string;
            time?: string | number;
        }, i: number) => {
            const stdout = result.stdout?.trim() ?? null;
            const expected_output = expected_outputs[i]?.trim();
            const passed = stdout === expected_output;

            if (!passed) allPassed = false;

            return {
                testCase: i + 1,
                passed,
                stdout,
                expected: expected_output,
                stderr: result.stderr ?? null,
                compile_output: result.compile_output ?? null,
                status: result.status.description,
                memory: result.memory ? `${result.memory}KB` : undefined,
                time: result.time ? `${result.time}ms` : undefined,
            };
        });

        const submission = await db.submission.create({
            data: {
                userId: dbUser!.id,
                problemId: id,
                sourceCode: source_code,
                language: getJudge0LanguageName(language_id) ?? "",
                stdin: stdin.join("\n"),
                stdout: JSON.stringify(detailedResults.map((r: { stdout: string }) => r.stdout)),
                stderr: detailedResults.some((r: { stderr: string }) => r.stderr)
                    ? JSON.stringify(detailedResults.map((r: { stderr: string }) => r.stderr))
                    : null,
                compileOutput: detailedResults.some((r: { compile_output: string }) => r.compile_output)
                    ? JSON.stringify(detailedResults.map((r: { compile_output: string }) => r.compile_output))
                    : null,
                status: allPassed ? "accepted" : "wrong answer",
                memory: detailedResults.some((r: { memory: string }) => r.memory)
                    ? JSON.stringify(detailedResults.map((r: { memory: string }) => r.memory))
                    : null,
                time: detailedResults.some((r: { time: string }) => r.time)
                    ? JSON.stringify(detailedResults.map((r: { time: string }) => r.time))
                    : null,
            }
        })

        if (allPassed) {
            await db.problemSolved.upsert({
                where: {
                    userId_problemId: {
                        userId: dbUser!.id,
                        problemId: id,
                    }
                },
                update: {},
                create: {
                    userId: dbUser!.id,
                    problemId: id,
                }
            });
        }

        const testCaseResults = detailedResults.map((result: { testCase: number; passed: boolean; stdout: string; expected: string; stderr: string; compile_output: string; status: string; memory: string; time: string }) => ({
            submissionId: submission.id,
            testCase: result.testCase,
            passed: result.passed,
            stdout: result.stdout,
            expected: result.expected,
            stderr: result.stderr,
            compileOutput: result.compile_output ?? "",
            status: result.status,
            memory: result.memory,
            time: result.time,
        }));

        await db.testCaseResult.createMany({
            data: testCaseResults,
        });

        const submissionWithTestCaseResults = await db.submission.findUnique({
            where: { id: submission.id },
            include: {
                testCases: true,
            }
        })

        return { success: true, submission: submissionWithTestCaseResults };
    } catch (error: any) {
        console.error("❌ Error executing code: ", error);
        fs.writeFileSync('execute-error.txt', error?.stack || error?.message || String(error));
        return { success: false, error: "Failed to execute code" };
    }
};