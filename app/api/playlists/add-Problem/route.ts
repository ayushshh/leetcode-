import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try{
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

        const { playlistId, problemId } = await request.json();
        if(!playlistId || !problemId){
            return NextResponse.json({
                success: false,
                error: "Missing playlistId or problemId"
            }, {
                status: 400
            })
        }

        const playlist = await db.playlist.findUnique({
            where: {
                id: playlistId,
                userId: dbUser?.id as string
            }
        })

        if(!playlist){
            return NextResponse.json({
                success: false,
                error: "Playlist not found"
            }, {
                status: 404
            })
        }

        const problemInPlaylist = await db.problemInPlaylist.create({
            data:{
                problemId: problemId,
                playlistId: playlistId
            }
        })

        return NextResponse.json({
            success: true,
            data: problemInPlaylist
        }, {
            status: 200
        })
    }catch(error){
        console.error("❌ Error adding problem to playlist: ", error);
        return NextResponse.json({
            success: false,
            error: "Failed to add problem to playlist"
        }, {
            status: 500
        })
    }
}