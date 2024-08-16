

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginForm from "./form";

export default async function RegisterPage() {
  const session = await auth()
 
  // if (!session?.user) return null

  // if (session) {
  //   redirect("/");
  // }

  return (
    <section className="bg-black h-screen flex items-center justify-center">
      <div className="w-[600px]">
        <LoginForm />
      </div>
    </section>
  );
}