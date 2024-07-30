import { redirect } from 'next/navigation';
import { PostList } from '@/components/posts/post-list';
import { fetchPostBySearchTerm } from '@/db/queries/post';

interface SearchPageProps {
	searchParams: {
		term: string;
	};
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const { term } = searchParams;

	if (!term) {
		redirect('/');
	}

	return <PostList fetchData={() => fetchPostBySearchTerm(term)} />;
};

export default SearchPage;
