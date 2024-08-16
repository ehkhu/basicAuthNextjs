import NextAuth, { CredentialsSignin } from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
import credentials from "next-auth/providers/credentials"
import { getUserFromDb, hashPassword, verifyPassword } from "./lib/utils"
import prisma from "./prisma/client"

// const prisma = new PrismaClient()

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    credentials({
      credentials: {
        email: { label: "Email"},
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // logic to verify if the user exists
        const user = await getUserFromDb(credentials.email+"", credentials.password+"");

        if (!user) {
          throw new Error("Invalid email or password");
        }
 
        // return user object with their profile data
        console.log(user);
        return user
      },
      
    }),
  ],
  callbacks: {
    // authorized({ request, auth }) {
    //   const { pathname } = request.nextUrl
    //   if (pathname === "/middleware-example") return !!auth
    //   return true
    // },
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session?.user?.name
      return token
    },
  },
})