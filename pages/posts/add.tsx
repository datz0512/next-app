import { useRouter } from 'next/router';
import { useState } from 'react';
import AddPostComponent from '@/components/addPost';

export default function AddPost() {
	const router = useRouter();

	const submitHandler = async (e: any) => {
		e.preventDefault();
		const title = e.target.title.value;
		const content = e.target.content.value;

		const res = await fetch(`http://127.0.0.1:3333/posts/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({ title, content }),
		});
		const user = await res.json();
		console.log(user);
		router.push('/posts');
	};

	return <AddPostComponent submit={submitHandler} header='Add a post' />;
}
