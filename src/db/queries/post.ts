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
