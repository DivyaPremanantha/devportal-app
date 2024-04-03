import NextAuth from "next-auth"
import AsgardeoProvider from "next-auth/providers/asgardeo";

export const { handlers: { GET, POST },
  auth, signIn, signOut } = NextAuth({
    providers: [AsgardeoProvider({
      clientId: process.env.ASGARDEO_CLIENT_ID,
      clientSecret: process.env.ASGARDEO_CLIENT_SECRET,
      issuer: process.env.ASGARDEO_ISSUER
    })
  ]
})