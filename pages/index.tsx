import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
	const [users, setUsers] = useState([]);
	const [userId, setUserId] = useState();
	const router = useRouter();

	useEffect(() => {
		if (!router.isReady) return;

		setUserId(localStorage.getItem('userId') as any);

		fetch('http://127.0.0.1:3333/user/all', {
			method: 'GET',
		})
			.then(res => res.json())
			.then(users => {
				console.log(users);
				setUsers(users);
			})
			.catch(err => console.error(err));
	}, [router.isReady, setUsers]);

	return (
		<div className=''>
			<div>
				<h1 className='text-2xl font-bold text-center text-black mb-10 mt-5'>
					All Users
				</h1>
			</div>
			{users.map((user: any) => (
				<div className='max-w-4xl px-10 my-4 py-6 bg-gray-300 rounded-lg shadow-md ml-60'>
					<div className='flex mt-2 justify-between'>
						<a
							className='text-2xl text-gray-700 font-bold hover:text-gray-600'
							href='#'
						>
							{user.email} {user.id == userId ? ' (You)' : ''}
						</a>
						<button
							onClick={() => router.push(`/posts/${user.id}`)}
							className='p-2 bg-gray-300 hover:opacity-70 rounded-sm ml-4 border-gray-400 border-2'
						>
							{user.id == userId ? ' View your posts' : 'View their posts'}
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
