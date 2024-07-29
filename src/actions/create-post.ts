'use server';
import type { Post } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';

const createPostSchema = z.object({
	title: z.string().min(5),
	content: z.string().min(10),
});

interface CreatePostFormState {
	errors: {
		title?: string[];
		content?: string[];
		_form?: string[];
	};
}

export const createPost = async (
	slug: string,
	formStatus: CreatePostFormState,
	formData: FormData
): Promise<CreatePostFormState> => {
	// Validated user input
	const result = createPostSchema.safeParse({
		title: formData.get('title'),
		content: formData.get('content'),
	});

	// Check if user submitted a valid data
	if (!result.success) {
		return {
			errors: result.error.flatten().fieldErrors,
		};
	}

	// Check if the user signed in
	const session = await auth();
	if (!session || !session.user) {
		return {
			errors: {
				_form: ['You must be signed in to do this!'],
			},
		};
	}

	// Get ID of the topic with the particular slug value
	const topic = await db.topic.findFirst({
		where: { slug },
	});

	// Check if topic with this slug exists in our DB
	// If not return an generic form error
	if (!topic) {
		return {
			errors: {
				_form: ['Can not find topic!'],
			},
		};
	}

	// Create post and add it to the DB
	let post: Post;
	try {
		post = await db.post.create({
			data: {
				title: result.data.title,
				content: result.data.content,
				userId: session.user.id,
				topicId: topic.id,
			},
		});
	} catch (err: unknown) {
		if (err instanceof Error) {
			return {
				errors: {
					_form: [err.message],
				},
			};
		} else {
			return {
				errors: {
					_form: ['Failed to create Post!'],
				},
			};
		}
	}

	// revalidate topic show page
	revalidatePath(paths.topicShow(slug));
	// redirect to post show page
	redirect(paths.postShow(slug, post.id));
};
