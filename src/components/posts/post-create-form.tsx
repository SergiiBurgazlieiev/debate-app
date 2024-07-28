'use client';
import { useFormState } from 'react-dom';
import {
	Input,
	Button,
	Textarea,
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@nextui-org/react';
import { FormButton } from '../common/form-button';

export const PostCreateForm = () => {
	return (
		<Popover placement='left'>
			<PopoverTrigger>
				<Button color='primary'>Create a post</Button>
			</PopoverTrigger>
			<PopoverContent>
				<form>
					<div className='flex flex-col gap-4 p-4 w-80'>
						<h3 className='text-lg'>Create a post</h3>
						<Input
							name='title'
							label='Title'
							labelPlacement='outside'
							placeholder='title'
						/>
						<Input
							name='content'
							label='Content'
							labelPlacement='outside'
							placeholder='Content'
						/>
						<FormButton>Create Post</FormButton>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	);
};
