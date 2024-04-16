import NextAuth from 'next-auth';
import { authConfig } from './authConfig';
import AsgardeoProvider from "next-auth/providers/asgardeo";

function getConfig() {
    if (process.env.DEPLOYMENT == 'DEV') {
      const auth = require(process.cwd() + "/../../public/resources/auth.json");
      return auth
    }
    if (process.env.DEPLOYMENT == 'PROD') {
      return {
        clientId: process.env.ASGARDEO_CLIENT_ID,
        clientSecret: process.env.ASGARDEO_CLIENT_SECRET,
        issuer: process.env.ASGARDEO_ISSUER
      }
    }
  }
  const config = getConfig();
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    AsgardeoProvider(
      config
    )
  ]
});