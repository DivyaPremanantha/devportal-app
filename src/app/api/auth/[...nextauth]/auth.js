import NextAuth from "next-auth"
import AsgardeoProvider from "next-auth/providers/asgardeo";
import { authConfig } from './authConfig';

export const { handlers: { GET, POST },
  auth, signIn, signOut } = NextAuth({

    ...authConfig,

    providers: [{
      id: "asgardeo", // signIn("my-provider") and will be part of the callback URL
      name: "asgardeo", // optional, used on the default login page as the button text.
      type: "oidc", // or "oauth" for OAuth 2 providers
      issuer: process.env.ASGARDEO_ISSUER, // to infer the .well-known/openid-configuration URL
      clientId: process.env.ASGARDEO_CLIENT_ID, // from the provider's dashboard
      clientSecret: process.env.ASGARDEO_CLIENT_SECRET, // from the provider's dashboard
    }]
  })