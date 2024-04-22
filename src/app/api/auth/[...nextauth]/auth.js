import NextAuth from "next-auth"
import AsgardeoProvider from "next-auth/providers/asgardeo";
import { authConfig } from './authConfig';
import  { NextApiRequest, NextApiResponse } from "next"



function getConfig() {
  if (process.env.NEXT_PUBLIC_DEPLOYMENT == 'DEV') {
    const auth = require(process.cwd() + "/../../public/resources/auth.json");
    auth.profile = (profile) => {

      return { role: profile.role ?? "user" }

    }
    return auth
  }
  if (process.env.NEXT_PUBLIC_DEPLOYMENT == 'PROD') {

    return {
      clientId: process.env.ASGARDEO_CLIENT_ID,
      clientSecret: process.env.ASGARDEO_CLIENT_SECRET,
      issuer: process.env.ASGARDEO_ISSUER,
      profile(profile) {
        console.log("profile");

        console.log(profile);
        return { role: profile.user_roles ?? "user" }
      }
    }
  }
}
const config = getConfig();
export const { handlers: { GET, POST },
  auth, signIn, signOut } = NextAuth({

    ...authConfig,

    providers: [
      AsgardeoProvider(
        config,

      )
    ]
  })