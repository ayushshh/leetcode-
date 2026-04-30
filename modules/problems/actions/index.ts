"use server"
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

        return { success: true, message: "Pproblem deleted successfully" };
    } catch (error) {
        console.error("❌ Error deleting problem: ", error);
        return { success: false, error: "Failed to delete problem" };
    }
}