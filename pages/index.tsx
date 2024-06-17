import { useTokenStore } from '@/store/token';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
	const [users, setUsers] = useState([]);
	const router = useRouter();
	const { userId, token } = useTokenStore() as any;

	useEffect(() => {
		const localToken = localStorage.getItem('token');

		if (!router.isReady) return;

		if (!token && !localToken) {
			router.push('/auth/login');
		}
		try {
			const fetchData = async () => {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const data = await res.json();
				setUsers(data);
			};

			fetchData();
		} catch (error) {
			console.error(error);
		}
	}, [router.isReady, setUsers, userId, router, token]);

	return (
		<div>
			<div>
				<h1 className='text-2xl font-bold text-center text-black mb-10 mt-5'>
					All Users
				</h1>
			</div>

			<div className='mx-auto w-1/2'>
				{users.map((user: any, key) => (
					<div
						key={key}
						className='max-w-4xl px-10 my-4 py-6 bg-gray-300 rounded-lg shadow-md'
					>
						<div className='flex mt-2 justify-between'>
							<h1 className='text-2xl text-gray-700 font-bold'>
								{user.email} {user.id == userId ? ' (You)' : ''}
							</h1>
							<button
								onClick={() => router.push(`/posts/user/${user.id}`)}
								className='p-2 bg-gray-300 hover:opacity-70 rounded-sm ml-4 border-gray-400 border-2'
							>
								{user.id == userId ? ' View your posts' : 'View their posts'}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
