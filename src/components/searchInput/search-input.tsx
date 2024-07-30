'use client';
import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { search } from '@/actions';

export const SearchInput = () => {
	const searchParams = useSearchParams();

	return (
		<form action={search}>
			<Input name='term' defaultValue={searchParams.get('term') || ''} />
		</form>
	);
};
