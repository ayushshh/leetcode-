import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { onBoardUser } from "@/modules/auth/actions";

export default async function Home() {
  await onBoardUser();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <UserButton />
    </div>
  );
}
