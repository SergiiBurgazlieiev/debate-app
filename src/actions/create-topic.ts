'use server';

import { z } from 'zod';

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

	return {
		errors: {},
	};

	// TODO: revalidate the homepage
};
