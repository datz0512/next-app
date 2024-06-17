import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddPost from '@/components/AddPost';
import { useTokenStore } from '@/store/token';

export default function EditPost() {
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const { token, userId } = useTokenStore() as any;
	const postId = router.query.id;

	useEffect(() => {
		if (!router.isReady) return;
		if (!token) {
			router.push('/auth/login');
		}
		const bearerToken = `Bearer ${token}`;

		try {
			const fetchData = async () => {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
					{
						method: 'GET',
						headers: {
							Authorization: bearerToken,
						},
					}
				);
				const post = await res.json();
				setTitle(post.title);
				setContent(post.content);
			};

			fetchData();
		} catch (error) {
			console.log(error);
		}
	}, [router.isReady, setTitle, setContent, postId, router, token]);

	const onSubmitHandler = async (e: any) => {
		e.preventDefault();
		const title = e.target.title.value;
		const content = e.target.content.value;

		if (!title || !content) return alert('Please fill in all fields');

		try {
			const res = await fetch(`http://localhost:3333/posts/edit/${postId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ title, content }),
			});
			const user = await res.json();
			console.log(user);
			router.push(`/posts/user/${userId}`);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<AddPost
				header={`Edit Post Id ${postId}`}
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
