import { currentUserRole } from "@/modules/auth/actions"
import { currentUser } from "@clerk/nextjs/server"
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { CreateProblemForm } from "@/modules/problems/components/create-problem-form"

async function currentProblemPage() {
  const userRole = await currentUserRole();
  const user = await currentUser();

  if(userRole !== UserRole.ADMIN) return redirect("/");

  return (
    <section className="flex flex-col items-center justify-center my-4 mx-4">
      <div className="flex flex-row justify-between items-center w-full">
        <Link href={"/"}>
          <Button variant={"outline"} size={"icon"}>
            <ArrowLeft className="size-4"/>
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-amber-400">Welcome {user?.firstName}! Create a Problem</h1>
        <ModeToggle />
      </div>
      <CreateProblemForm />
    </section>
  )
}

export default currentProblemPage