import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
	const [users, setUsers] = useState([]);
	const router = useRouter();

	useEffect(() => {
		fetch('http://127.0.0.1:3333/user/all', {
			method: 'GET',
		})
			.then(res => res.json())
			.then(users => {
				console.log(users);
				setUsers(users);
			})
			.catch(err => console.error(err));
	}, [setUsers]);

	return (
		<div className=''>
			<div>
				<h1 className='text-2xl font-bold text-center text-black mb-10'>
					All Users
				</h1>
			</div>
			{users.map((user: any) => (
				<div className='max-w-4xl px-10 my-4 py-6 bg-gray-300 rounded-lg shadow-md ml-4'>
					<div className='mt-2'>
						<a
							className='text-2xl text-gray-700 font-bold hover:text-gray-600'
							href='#'
						>
							{user.email}
						</a>
						<p className='mt-2 text-gray-600'>{user.content}</p>
					</div>
				</div>
			))}
		</div>
	);
}
