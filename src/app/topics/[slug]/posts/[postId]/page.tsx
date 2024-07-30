import { Suspense } from 'react';
import Link from 'next/link';
import paths from '@/paths';
import { PostShow } from '@/components/posts/post-show';
import { CommentList } from '@/components/comments/comment-list';
import { CommentCreateForm } from '@/components/comments/comment-create-form';
import { LoadingSkeleton } from '@/components/common/loading-skeleton';

interface PostShowPageProps {
	params: {
		slug: string;
		postId: string;
	};
}

export default async function PostShowPage({ params }: PostShowPageProps) {
	const { slug, postId } = params;

	return (
		<div className='space-y-3'>
			<Link className='underline decoration-solid' href={paths.topicShow(slug)}>
				{'< '}Back to {slug}
			</Link>
			<Suspense fallback={<LoadingSkeleton />}>
				<PostShow postId={postId} />
			</Suspense>
			<CommentCreateForm postId={postId} startOpen />
			<Suspense fallback={<LoadingSkeleton />}>
				<CommentList postId={postId} />
			</Suspense>
		</div>
	);
}
