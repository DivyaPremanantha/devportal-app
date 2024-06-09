import NextAuth from "next-auth";
import { authConfig } from './authConfig';

const providers = require(process.cwd() + "/public/resources/auth.json");

const loadProviders = providers.map(provider => {
  return {
      ...provider,
      profile(profile) {
        return { role: profile.user_roles ?? "user" }
      }
  };
});

export const { handlers: { GET, POST },
  auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: loadProviders,
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
