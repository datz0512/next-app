import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AddPost() {
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const submitHandler = (e: any) => {
		e.preventDefault();
		const title = e.target[0].value;
		const content = e.target[1].value;
		console.log(title, content);
		router.push('/posts');
	};

	return (
		<div>
			<p>Add a post</p>
			<form onSubmit={submitHandler}>
				<label htmlFor='title'>Title</label>
				<input
					type='text'
					value={title}
					id='title'
					name='title'
					onChange={e => setTitle(e.target.value)}
					style={{ color: 'black' }}
				/>

				<label htmlFor='description'>Description:</label>
				<textarea
					value={description}
					id='description'
					name='description'
					onChange={e => setDescription(e.target.value)}
					style={{ color: 'black' }}
					rows={4}
					cols={50}
				/>
				<button type='submit'>Add Post</button>
			</form>
		</div>
	);
}
