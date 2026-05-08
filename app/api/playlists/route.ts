import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request : Request) {
    try {
        const user = await currentUser();
        if(!user){
            return NextResponse.json({
                success: false,
                error: "Unauthorized access"
            }, {
                status: 401
            })
        }

        const dbUser = await db.user.findUnique({
            where: {
                clerkId: user?.id
            }
        })

        if(!dbUser){
            return NextResponse.json({
                success: false,
                error: "User not found"
            }, {
                status: 404
            })
        }
        const { name, description } = await request.json();
        if(!name || !description){
            return NextResponse.json({
                success: false,
                error: "Missing required fields"
            }, {
                status: 400
            })
        }

        const playListData = await db.playlist.create({
            data: {
                name,
                description,
                userId: dbUser?.id as string
            }
        })

        return NextResponse.json({
            success: true,
            data: playListData
        }, {
            status: 200
        })
    } catch (error) {
        console.error("Error creating playlist:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to create playlist"
        }, {
            status: 500
        })
    }
}

export async function GET(request : Request){
    try {
        const user = await currentUser();
        if(!user){
            return NextResponse.json({
                success: false,
                error: "Unauthorized access"
            }, {
                status: 401
            })
        }

        const dbUser = await db.user.findUnique({
            where: {
                clerkId: user?.id
            }
        })

        if(!dbUser){
            return NextResponse.json({
                success: false,
                error: "User not found"
            }, {
                status: 404
            })
        }

        const playlists = await db.playlist.findMany({
            where : {
                userId: dbUser?.id as string
            },
            include: {
                problems: {
                    include: {
                        problem : {
                            select: {
                                id : true,
                                title : true,
                                difficulty : true
                            }
                        }
                    }
                }
            },
            orderBy: {
                CreatedAt: "desc"
            }
        })

        return NextResponse.json({
            success: true,
            data: playlists
        }, {
            status: 200
        })
    } catch (error) {
        console.error("Error fetching playlists:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch playlists"
        }, {
            status: 500
        })
    }
}