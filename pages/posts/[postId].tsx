import { useTokenStore } from '@/store/token';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Posts() {
	const router = useRouter();
	const [post, setPost] = useState([]) as any;
	const { token } = useTokenStore() as any;

	const postId = router.query.postId;
	console.log(postId);

	useEffect(() => {
		if (!router.isReady) return;

		if (!postId) {
			router.push('/');
			return;
		}

		if (!token) {
			router.push('/auth/login');
			return;
		}

		try {
			const fetchData = async () => {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);
				const data = await res.json();

				if (data) {
					setPost(data);
				}
			};

			fetchData();
		} catch (error) {
			console.log(error);
		}
	}, [router.isReady, postId, router, setPost, token]);

	console.log(post);

	return (
		<>
			<div>
				<h1 className='text-2xl font-bold text-center text-black mb-10 mt-5'>
					Detail Page
				</h1>
			</div>
			<div className='max-w-4xl px-10  py-6 bg-gray-300 rounded-lg shadow-md mx-auto w-1/2 mt-12'>
				<div className='mt-2 hover:opacity-90'>
					<h1 className='text-2xl text-gray-700 font-bold'>{post.title}</h1>
					<p className='mt-2 text-gray-600'>{post.content}</p>
				</div>
			</div>
		</>
	);
}
