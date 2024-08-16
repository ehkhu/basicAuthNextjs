import { auth } from "@/auth";
import { Guest, SignOut } from "@/components/ui/auth-component";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
    if (!session?.user) {
     redirect("/login");
    }
    console.log('session' , session)
  return (
        <>
        <h1>Basic Auth</h1>
          {session.user ? <SignOut></SignOut> : <Guest/>}
        </>
  );
}
