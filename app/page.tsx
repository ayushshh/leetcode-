import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <UserButton />
    </div>
  );
}
