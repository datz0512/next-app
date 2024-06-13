import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Posts() {
	const [myPosts, setMyPosts] = useState([]);
	const [userEmail, setUserEmail] = useState();
	const [userId, setUserId] = useState();
	const router = useRouter();

	const addPostHandler = () => {
		router.push('/posts/add');
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		setUserId(localStorage.getItem('userId') as any);
		if (!router.isReady) return;
		if (!token) {
			router.push('/auth/login');
		}
		const bearerToken = `Bearer ${token}`;
		// fetch posts
		fetch(`http://127.0.0.1:3333/posts/${router.query.userId}`, {
			method: 'GET',
			headers: {
				Authorization: bearerToken,
			},
		})
			.then(res => res.json())
			.then(data => {
				setMyPosts(data.posts);
				setUserEmail(data.user);
			})
			.catch(err => console.error(err));
	}, [router.isReady, setMyPosts]);

	console.log(myPosts);

	return (
		<div className='items-center'>
			<div>
				<h1 className='text-2xl font-bold text-center text-black mb-10 mt-5'>
					{router.query.userId == userId ? 'Your Posts' : `${userEmail} Posts`}
				</h1>
			</div>
			<div className='ml-60'>
				{router.query.userId == userId ? (
					<button
						onClick={addPostHandler}
						className='p-5 bg-gray-300 hover:opacity-70 rounded-sm ml-4 border-gray-400 border-2'
					>
						Add Post
					</button>
				) : (
					``
				)}

				{myPosts.map((post: any) => (
					<div className='max-w-4xl px-10 my-4 py-6 bg-gray-300 rounded-lg shadow-md ml-4'>
						<div className='flex justify-between items-center'>
							<span className='font-light text-gray-600'>
								{post.created_at.split('T')[0] +
									' ' +
									post.created_at.split('T')[1].split('+')[0]}
							</span>
							{router.query.userId == userId ? (
								<a
									className='px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500'
									href={`/posts/edit/${post.id}`}
								>
									Edit
								</a>
							) : (
								''
							)}
						</div>
						<div className='mt-2'>
							<a
								className='text-2xl text-gray-700 font-bold hover:text-gray-600'
								href='#'
							>
								{post.title}
							</a>
							<p className='mt-2 text-gray-600'>{post.content}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
