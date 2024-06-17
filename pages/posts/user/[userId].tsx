import { useTokenStore } from '@/store/token';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Posts() {
	const [myPosts, setMyPosts] = useState([]);
	const [userEmail, setUserEmail] = useState();
	const { userId, token } = useTokenStore() as any;
	const router = useRouter();
	const userIdParams = router.query.userId;

	const addPostHandler = () => {
		router.push('/posts/add');
	};

	useEffect(() => {
		if (!router.isReady) return;

		if (!token) {
			router.push('/auth/login');
			return;
		}

		const bearerToken = `Bearer ${token}`;
		try {
			const fetchData = async () => {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/posts/user/${userIdParams}`,
					{
						method: 'GET',
						headers: {
							Authorization: bearerToken,
						},
					}
				);
				const data = await res.json();
				setMyPosts(data.posts);
				setUserEmail(data.user);
			};

			fetchData();
		} catch (error) {
			console.log(error);
		}
	}, [router.isReady, setMyPosts, setUserEmail, router, token, userIdParams]);

	return (
		<div>
			<div>
				<h1 className='text-2xl font-bold text-center text-black mb-10 mt-5'>
					{router.query.userId == userId ? 'Your Posts' : `${userEmail} Posts`}
				</h1>
			</div>

			<div className='mx-auto w-1/2'>
				{router.query.userId == userId && (
					<button
						onClick={addPostHandler}
						className='p-5 bg-gray-300 hover:opacity-70 rounded-sm ml-4 border-gray-400 border-2'
					>
						Add Post
					</button>
				)}

				{myPosts?.map((post: any, key) => (
					<div
						key={key}
						className='max-w-4xl px-10 my-4 py-6 bg-gray-300 rounded-lg shadow-md ml-4 cursor-pointer'
					>
						<div className='flex justify-between items-center'>
							<span className='font-light text-gray-600'>
								{post.created_at.split('T')[0] +
									' ' +
									post.created_at.split('T')[1].split('+')[0]}
							</span>

							{router.query.userId == userId && (
								<Link
									className='px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:opacity-85'
									href={`/posts/edit/${post.id}`}
								>
									Edit
								</Link>
							)}
						</div>

						<div
							className='mt-2 hover:opacity-90'
							onClick={() => router.push(`/posts/${post.id}`)}
						>
							<Link
								className='text-2xl text-gray-700 font-bold'
								href={`/posts/${post.id}`}
							>
								{post.title}
							</Link>
							<p className='mt-2 text-gray-600'>{post.content}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
