import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Posts() {
	const [myPosts, setMyPosts] = useState([]);
	const router = useRouter();

	const addPostHandler = () => {
		router.push('/posts/add');
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			router.push('/auth/login');
		}
		const bearerToken = `Bearer ${token}`;
		// fetch posts
		fetch('http://127.0.0.1:3333/posts', {
			method: 'GET',
			headers: {
				Authorization: bearerToken,
			},
		})
			.then(res => res.json())
			.then(posts => {
				console.log(posts);
				setMyPosts(posts);
			})
			.catch(err => console.error(err));
	}, [setMyPosts]);

	console.log(myPosts);

	return (
		<div>
			<div>
				<h1 className='text-2xl font-bold text-center text-black mb-10'>
					Your Posts
				</h1>
			</div>
			<button
				onClick={addPostHandler}
				className='p-5 bg-gray-300 hover:opacity-70 rounded-sm ml-4 border-gray-400 border-2'
			>
				Add Post
			</button>
			{myPosts.map((post: any) => (
				<div className='max-w-4xl px-10 my-4 py-6 bg-gray-300 rounded-lg shadow-md ml-4'>
					<div className='flex justify-between items-center'>
						<span className='font-light text-gray-600'>
							{post.created_at.split('T')[0] +
								' ' +
								post.created_at.split('T')[1].split('+')[0]}
						</span>
						<a
							className='px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500'
							href={`/posts/${post.id}`}
						>
							Edit
						</a>
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
	);
}
