import NextAuth from "next-auth";
import { authConfig } from './authConfig';
import { getProviders } from '../../../../pages/signIn';

const providers = getProviders();
console.log(providers);

export const { handlers: { GET, POST },
  auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers
  })
