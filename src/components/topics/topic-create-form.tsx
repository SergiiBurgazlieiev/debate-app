'use client';
import {
	Input,
	Button,
	Popover,
	Textarea,
	PopoverTrigger,
	PopoverContent,
} from '@nextui-org/react';
import { useFormState } from 'react-dom';
import { createTopic } from '@/actions';

/**
 * IMPORTANT!
 * The second argument of our useFormState hook is the INITIAL_STATE.
 * Therefore, the type of this INITIAL_STATE must match the first argument
 * and the return type of your server action. If they do not match,
 * TypeScript will generate an error and highlight the createTopic in red
 * inside of our useFormState hook.
 */

export const TopicCreateForm = () => {
	const [formState, action] = useFormState(createTopic, { errors: {} });
	console.log('FORM STATE', formState);
	return (
		<Popover placement='left'>
			<PopoverTrigger>
				<Button color='primary'>Create a Topic</Button>
			</PopoverTrigger>
			<PopoverContent>
				<form action={action}>
					<div className='flex flex-col gap-4 p-4 w-80'>
						<h3 className='text-lg'>Create a Topic</h3>
						<Input
							name='name'
							label='Name'
							labelPlacement='outside'
							placeholder='name'
							isInvalid={!!formState.errors.name}
							errorMessage={formState.errors?.name?.join('. ')}
						/>
						<Textarea
							name='description'
							label='Description'
							labelPlacement='outside'
							placeholder='Describe your topic'
							isInvalid={!!formState.errors.description}
							errorMessage={formState.errors?.description?.join('. ')}
						/>
						{formState.errors?._form && (
							<div className='p-2 bg-red-200 border rounded border-red-400'>
								{formState.errors._form.join('. ')}
							</div>
						)}
						<Button type='submit'>Submit</Button>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	);
};
