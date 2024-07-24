import { Button } from '@nextui-org/react';
import { signIn, signOut } from '@/actions';
import { auth } from '@/auth';

export default async function Home() {
	const session = await auth();
	return (
		<div>
			<form action={signIn}>
				<Button type='submit'>SignIn</Button>
			</form>
			<form action={signOut}>
				<Button type='submit'>SignOut</Button>
			</form>
			{JSON.stringify(session)}
		</div>
	);
}
