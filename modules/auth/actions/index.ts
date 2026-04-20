"use server"
import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

export const onBoardUser = async() => {
    try {
        const user = await currentUser();
        if(!user){
            return {
                success: false,
                error: "No authenticated user found"
            }
        }
        const { id, firstName, lastName, imageUrl, emailAddresses } = user;
        const newUser = await db.user.upsert({
            where:{
                clerkId: id
            },
            update:{
                firstName: firstName || null,
                lastName: lastName || null,
                imageUrl: imageUrl || null,
                email: emailAddresses[0].emailAddress || ""
            },
            create:{
                clerkId: id,
                firstName: firstName || null,
                lastName: lastName || null,
                imageUrl: imageUrl || null,
                email: emailAddresses[0].emailAddress || ""
            }
        })

        return {
            success: true,
            data: newUser,
            message: "User onBoarded successfully"
        }
    } catch (error) {
        console.error("❌ Error onboarding user:", error);
        return {
            success: false,
            error: "Error onboarding user"
        }
    }
}

export const currentUserRole = async () => {
    try {
        const user = await currentUser();
        if(!user){
            return {
                success: false,
                error: "No authenticated user found"
            }
        }
        const { id } = user;
        const userRole = await db.user.findUnique({
            where: {
                clerkId: id
            },
            select: {
                role: true
            }
        })
        return userRole?.role;
    } catch (error) {
        console.error("❌ Error fetching user role: ", error);
        return {
            success: false,
            error: "Failed to fetch user role"
        }
    }
}

export async function getCurrentUser(){
    try {
        const user = await currentUser();
        if(!user){
            return null;
        }
        const { id } = user;
        const userDb = await db.user.findUnique({
            where: {
                clerkId: id
            },
            select:{
                id : true
            }
        });
        return userDb;
    } catch (error) {
        console.error("❌ Error fetching current user: ", error);
        return null;
    }
}
