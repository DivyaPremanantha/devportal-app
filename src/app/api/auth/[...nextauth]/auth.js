import NextAuth from "next-auth";
import { authConfig } from './authConfig';

const providers = require(process.cwd() + "/../../public/resources/auth.json");
console.log(providers);

export const { handlers: { GET, POST },
  auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: providers,
    callbacks: {
      jwt({ token, user }) {
        if (user) token.role = user.role
        return token
      },
      session({ session, token }) {
        session.user.role = token.role
        return session
      }
    }
  })
