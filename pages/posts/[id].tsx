import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddPost from '../../components/addPost';

export default function EditPost() {
	const router = useRouter();
	const [post, setPost] = useState({});

	const onSubmitHandler = async (e: any) => {
		e.preventDefault();
		const title = e.target.title.value;
		const content = e.target.content.value;

		const res = await fetch(`http://127.0.0.1:3333/posts/${router.query.id}`, {
			method: 'PUT',
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

	useEffect(() => {
		// fetch post with id
		const postId = router.query.id;

		console.log(postId);

		const token = localStorage.getItem('token');
		if (!token) {
			router.push('/auth/login');
		}
		const bearerToken = `Bearer ${token}`;

		fetch(`http://127.0.0.1:3333/posts/view/${postId}`, {
			method: 'GET',
			headers: {
				Authorization: bearerToken,
			},
		})
			.then(res => res.json())
			.then(post => {
				setPost(post);
				console.log(post);
			})
			.catch(err => {
				console.error(err);
			});
	}, [setPost]);

	return (
		<div>
			<p>Edit post with id: {router.query.id}</p>
			<AddPost
				header={`Edit Post Id ${router.query.id}`}
				submit={onSubmitHandler}
			/>
		</div>
	);
}
