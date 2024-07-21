'use client';
/**
 * We utilize this provider to manage the state
 * of NextUI components effectively. Given that
 * many NextUI components maintain their own state,
 * using a provider ensures consistent state access
 * and smooth functionality across all our NextUI components.
 */
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
	children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
	return (
		<SessionProvider>
			<NextUIProvider>{children}</NextUIProvider>
		</SessionProvider>
	);
}
