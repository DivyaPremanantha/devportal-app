import NextAuth from "next-auth";
import { authConfig } from './authConfig';

const providers = require(process.cwd() + "/../../public/resources/auth.json");
console.log(providers);

export const { handlers: { GET, POST },
  auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers
  })
