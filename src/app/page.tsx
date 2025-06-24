import {Button} from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Link href="/login">
          <Button className="cursor-pointer">Login</Button>
        </Link>
      </main>
  );
}
