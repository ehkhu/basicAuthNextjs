import { signOut } from "@/auth"
import { Button } from "./button"
import { signIn } from "next-auth/react"
import Link from "next/link"


export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
    return (
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
        className="w-full"
      >
        <Button variant="ghost" className="w-full p-0" {...props}>
          Sign Out
        </Button>
      </form>
    )
  }

  export function Guest(){
    return (
      <>
        <Link href={'/login'}>Login</Link>      /  
        <Link href={'/register'}>Register</Link> 
      </>
    )
  }