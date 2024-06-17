import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddPostComponent from '@/components/AddPost';
import { useTokenStore } from '@/store/token';

export default function AddPost() {
	const router = useRouter();
	const { userId, token } = useTokenStore() as any;
	const [currentUser, setCurrentUser] = useState();

	useEffect(() => {
		if (!router.isReady) return;

		if (!token) {
			router.push('/auth/login');
			return;
		}

		if (userId) {
			setCurrentUser(userId as any);
		}
	}, [router.isReady, router, setCurrentUser, userId, token]);

	const submitHandler = async (e: any) => {
		e.preventDefault();
		const title = e.target.title.value;
		const content = e.target.content.value;

		if (!title || !content) return alert('Please fill in all fields');
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/posts/create`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ title, content }),
				}
			);
			const user = await res.json();
			console.log(user);
			router.push(`/posts/user/${currentUser}`);
		} catch (error) {
			console.log(error);
		}
	};

	return <AddPostComponent submit={submitHandler} header='Add a post' />;
}
