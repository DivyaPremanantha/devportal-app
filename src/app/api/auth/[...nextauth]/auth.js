import NextAuth from "next-auth";
import { authConfig } from './authConfig';
import { getProviders } from '../../../../pages/signIn';

const providers = getProviders();
console.log(providers);

auth.profile = (profile) => {
  return { role: profile.role ?? "user" }
}

export const { handlers: { GET, POST },
  auth, signIn, signOut } = NextAuth({
    ...authConfig,

    providers: providers,
    callbacks: {
      jwt({ token, user }) {
        console.log("roles")
        console.log(user)
        if (user) token.role = user.role
        return token
      },
      session({ session, token }) {
        session.user.role = token.role
        return session
      }
    }
  })
