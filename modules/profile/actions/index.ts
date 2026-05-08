"use server"

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server"

export const getCurrentUserData = async () => {
    try {
        const user = await currentUser();
        if (!user?.id) {
            return { success: false, error: "User not found" }
        }
        const data = await db.user.findUnique({
            where: {
                clerkId: user?.id
            },
            include: {
                submissions: true,
                solvedProblems: true,
                playlists: true
            }
        })
        return { data }
    } catch (error) {
        console.error("❌ Error in getting user data", error);
        return { success: false, error: "Failed to get user data" }
    }
}