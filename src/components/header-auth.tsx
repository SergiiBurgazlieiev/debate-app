'use client';
/**
 * We created the client header-auth.tsx component to ensure that our home page
 * and other static pages remain static. Previously, we were checking the session
 * status inside our header.tsx component, which is a server component.
 * The next-auth modifies cookies behind the scenes - it means our header.tsx included
 * dynamic functions. Since the Header component is rendered inside our Layout component
 * and contains dynamic functionality, Next.js marked all our pages as dynamic after building the app,
 * even though some of them are not dynamic pages and we want to keep them static.
 */
import {
	Navbar,
	Button,
	Avatar,
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@nextui-org/react';
import { signOut as nextAuthSignOut, useSession } from 'next-auth/react';
import { signIn, signOut } from '@/actions';

export const HeaderAuth = () => {
	const session = useSession();

	let authContent: React.ReactNode;
	/*
   To prevent "flash content" from appearing on our header when the user refreshes the page, 
   we set authContent to null if the authentication session is in a loading status.
  */
	if (session.status === 'loading') {
		authContent = null;
	} else if (session?.data?.user) {
		authContent = (
			<Popover placement='left'>
				<PopoverTrigger>
					<Avatar src={session.data.user.image || ''} />
				</PopoverTrigger>
				<PopoverContent>
					<div className='p-4'>
						<form
							action={async () => {
								await signOut();
								//this resolves temp nextAuth bug
								await nextAuthSignOut();
							}}
						>
							<Button type='submit'>Sign Out</Button>
						</form>
					</div>
				</PopoverContent>
			</Popover>
		);
	} else {
		authContent = (
			<>
				<Navbar>
					<form action={signIn}>
						<Button type='submit' color='secondary' variant='bordered'>
							Sign In
						</Button>
					</form>
				</Navbar>
				<Navbar>
					<form action={signIn}>
						<Button type='submit' color='primary' variant='flat'>
							Sign Up
						</Button>
					</form>
				</Navbar>
			</>
		);
	}

	return authContent;
};
