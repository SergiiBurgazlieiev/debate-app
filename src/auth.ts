import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './db';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
	throw new Error('Missing GitHub OAuth credentials');
}

export const {
	/**
	 * Request handlers: These are associated with the OAuth setup
	 * and will eventually be automatically triggered by GitHub servers
	 * whenever a user attempts to signIn to our app.
	 */
	handlers: { GET, POST },
	/**
   *The auth function helps us determine whether or not 
   a user is signed in to our application.
   */
	auth,
	signOut,
	signIn,
} = NextAuth({
	adapter: PrismaAdapter(db),
	providers: [
		GitHub({
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
		}),
	],
	callbacks: {
		/**
		 * Usually not needed, but I am using it now to fix the
		 * current next-auth bug
		 */
		async session({ session, user }: any) {
			if (session && user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
});
