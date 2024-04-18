import NextAuth from "next-auth"
import AsgardeoProvider from "next-auth/providers/asgardeo";
import { authConfig } from './authConfig';


function getConfig() {
  if (process.env.NEXT_PUBLIC_DEPLOYMENT == 'DEV') {
    const auth = require(process.cwd() + "/../../public/resources/auth.json");

    return auth
  }
  if (process.env.NEXT_PUBLIC_DEPLOYMENT == 'PROD') {

    return {
      clientId: process.env.ASGARDEO_CLIENT_ID,
      clientSecret: process.env.ASGARDEO_CLIENT_SECRET,
      issuer: process.env.ASGARDEO_ISSUER
    }
  }
}
const config = getConfig();
export const { handlers: { GET, POST },
  auth, signIn, signOut } = NextAuth({

    ...authConfig,

    providers: [
      AsgardeoProvider(
        config
      )
    ]
  })