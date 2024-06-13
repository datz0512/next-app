import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddPost from '../../../components/addPost';

export default function EditPost() {
	const router = useRouter();
	const [userId, setUserId] = useState();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const onSubmitHandler = async (e: any) => {
		e.preventDefault();
		const title = e.target.title.value;
		const content = e.target.content.value;

		const res = await fetch(
			`http://localhost:3333/posts/edit/${router.query.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({ title, content }),
			}
		);
		const user = await res.json();
		console.log(user);
		router.push(`/posts/${userId}`);
	};

	useEffect(() => {
		if (!router.isReady) return;
		const token = localStorage.getItem('token');
		setUserId(localStorage.getItem('userId') as any);
		if (!token) {
			router.push('/auth/login');
		}
		const bearerToken = `Bearer ${token}`;

		fetch(`http://127.0.0.1:3333/posts/view/${router.query.id}`, {
			method: 'GET',
			headers: {
				Authorization: bearerToken,
			},
		})
			.then(res => res.json())
			.then(post => {
				setTitle(post.title);
				setContent(post.content);
			})
			.catch(err => {
				console.error(err);
			});
	}, [router.isReady, setTitle, setContent]);

	return (
		<div>
			<p>Edit post with id: {router.query.id}</p>
			<AddPost
				header={`Edit Post Id ${router.query.id}`}
				submit={onSubmitHandler}
				title={title}
				content={content}
				onChange={(e: any) => {
					if (e.target.name === 'title') setTitle(e.target.value);
					if (e.target.name === 'content') setContent(e.target.value);
				}}
			/>
		</div>
	);
}
