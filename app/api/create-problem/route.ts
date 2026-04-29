import { getJudgeZeroId, pollBatchResults, submitBach } from "@/lib/judge0";
import { currentUserRole, getCurrentUser } from "@/modules/auth/actions";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const userRole = await currentUserRole();
        const user = await getCurrentUser();

        if (userRole !== UserRole.ADMIN) {
            return NextResponse.json({
                error: "Unauthorized access"
            }, {
                status: 401
            })
        }

        const body = await request.json();
        const {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            hints,
            editorial,
            testCases,
            codeSnippets,
            referenceSolutions
        } = body;

        if (!title || !description || !difficulty || !testCases || !codeSnippets || !referenceSolutions) {
            return NextResponse.json({
                error: "required missing fields"
            }, { status: 400 })
        }

        if (!Array.isArray(testCases) || testCases.length === 0) {
            return NextResponse.json({
                error: "testCases must be an array with at least one element"
            }, {
                status: 400
            })
        }

        if (!referenceSolutions || typeof referenceSolutions !== "object" || Object.keys(referenceSolutions).length === 0) {
            return NextResponse.json({
                error: "referenceSolutions must be an object with at least one key"
            }, { status: 400 })
        }

        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getJudgeZeroId(language);

            if (!languageId) {
                return NextResponse.json({
                    error: `language ${language} is not supported`
                }, { status: 400 })
            }

            //prepare judge0 for the submission 
            const submission = testCases.map(({input, output}) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }));

            const submissionResult = await submitBach(submission);
            const tokens = submissionResult.map((res: { token: string }) => res.token);
            const result = await pollBatchResults(tokens);

            for (let i = 0; i < result.length; i++) {
                const results = result[i];
                if (results.status.id !== 3) {
                    return NextResponse.json({
                        error: `Failed to validate reference solution for language ${language}`,
                        testCases: {
                            input: submission[i].stdin,
                            expected_output: submission[i].expected_output,
                            actual_output: results.stdout,
                            error: results.stderr || results.compile_output,
                        },
                        details: results
                    }, {
                        status: 400
                    })
                }
            }
        }

        if (!user) {
            return NextResponse.json({
                error: "User not found"
            }, {
                status: 404
            })
        }

        const saveProblem = await db.problem.create({
            data: {
                title: title,
                description: description,
                difficulty: difficulty,
                tags: tags,
                examples: examples,
                constraints: constraints,
                hints: hints,
                editorial: editorial,
                testCases: testCases,
                codeSnippets: codeSnippets,
                referenceSolutions: referenceSolutions,
                userId: user.id,
            }
        });

        return NextResponse.json({ success: true, problem: saveProblem }, { status: 201 });
    // in route.ts - update the catch block
} catch (error) {
    console.error("FULL ERROR:", error); // already there but let's check
    return NextResponse.json({ 
        error: "Failed to create problem",
        details: error instanceof Error ? error.message : String(error)  // ADD THIS
    }, { status: 500 });
}
}