'use server';

import { z } from 'zod';
import { auth } from '@/auth';

// Create topic schema
const createTopicSchema = z.object({
	name: z
		.string()
		.min(3)
		.regex(/[a-z-]/, {
			message: 'Must be lowercase letters or dashes without spaces',
		}),
	description: z.string().min(10),
});

// formState type
interface CreateTopicFormState {
	errors: {
		name?: string[];
		description?: string[];
		_form?: string[];
	};
}

export const createTopic = async (
	formState: CreateTopicFormState,
	formData: FormData
): Promise<CreateTopicFormState> => {
	const result = createTopicSchema.safeParse({
		name: formData.get('name'),
		description: formData.get('description'),
	});

	if (!result.success) {
		/*
		 * If we want to get back a nicely formatted
		 * list of errors - we can call result, error, flatten and then
		 * reference field errors.
		 */
		return {
			errors: result.error.flatten().fieldErrors,
		};
	}

	/**
	 * A generic error message will be displayed on the form
	 * when a user attempts to create a topic without being
	 * authenticated.
	 */
	const session = await auth();
	if (!session || !session?.user) {
		return {
			errors: {
				_form: ['You must signIn to create a topic!'],
			},
		};
	}

	return {
		errors: {},
	};

	// TODO: revalidate the homepage
};
