import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostWithData = Post & {
	topic: { slug: string };
	_count: { comments: number };
	user: { name: string | null };
};

export const fetchPostsByTopicSlug = (
	slug: string
): Promise<PostWithData[]> => {
	return db.post.findMany({
		where: { topic: { slug } },
		include: {
			topic: { select: { slug: true } },
			user: { select: { name: true } },
			_count: { select: { comments: true } },
		},
	});
};

export const fetchTopPosts = (): Promise<PostWithData[]> => {
	return db.post.findMany({
		orderBy: [
			{
				comments: {
					_count: 'desc',
				},
			},
		],
		include: {
			topic: { select: { slug: true } },
			user: { select: { name: true, image: true } },
			_count: { select: { comments: true } },
		},
		take: 5,
	});
};

export const fetchPostBySearchTerm = (
	term: string
): Promise<PostWithData[]> => {
	return db.post.findMany({
		include: {
			topic: { select: { slug: true } },
			user: { select: { name: true, image: true } },
			_count: { select: { comments: true } },
		},
		where: {
			OR: [{ title: { contains: term } }, { content: { contains: term } }],
		},
	});
};
