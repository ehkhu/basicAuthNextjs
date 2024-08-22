import NextAuth, { CredentialsSignin } from "next-auth"
import credentials from "next-auth/providers/credentials"
import { getUserFromDb} from "./lib/utils"

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}

function  authUserFormatter(authUser:any){
  if (authUser) {
    console.log(authUser.email);
  const  user = {
      id: authUser.id,
      name:authUser.name,
      email: authUser.email,
      role: authUser.role?.name,
      permissions: authUser.role?.permissions.map((perm:any) => perm.name),
    };
    return user;
  }
  return {};
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
        const authUser = await getUserFromDb(credentials.email+"", credentials.password+"");
        if (!authUser) {
          throw new Error("Invalid email or password");
        }
        console.log("Auth user : ",authUser)
        // return user object with their profile data
        const user = await authUserFormatter(authUser);  // prepare for auth permission
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
    
    jwt({ token, trigger, session, user }) {
      if (trigger === "update") token.name = session?.user?.name
      if(user) {
        token.role = user.role
        token.permissions = user.permissions;
      } // add more fields by next-auth.d.ts
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.role = token.role as string;
        session.user.permissions = token.permissions as string;
      }
      return session;
    }

  },
})