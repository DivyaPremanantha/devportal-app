import NextAuth from 'next-auth';
import { authConfig } from './api/auth/[...nextauth]/authConfig';


export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [ "/((?!api/auth|resources|_next|fonts|examples|[\\w-]+\\.\\w+).*)",],
};