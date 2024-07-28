'use server';
import type { Post } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { title } from 'process';

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
	formStatus: CreatePostFormState,
	formData: FormData
): Promise<CreatePostFormState> => {
	const result = createPostSchema.safeParse({
		title: formData.get('title'),
		content: formData.get('content'),
	});

	if (!result.success) {
		return {
			errors: result.error.flatten().fieldErrors,
		};
	}

	return {
		errors: {},
	};
	//TODO: revalidate the topic show page
};
