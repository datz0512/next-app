import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTokenStore } from '../store/token';

export default function Navbar() {
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState(undefined);
	const { token } = useTokenStore() as any;

	useEffect(() => {
		const userId = localStorage.getItem('userId');
		console.log('userID from localStorage:', userId);

		if (userId) {
			setCurrentUser(JSON.parse(userId!));
		}
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem('userId');
		localStorage.removeItem('token');
		setCurrentUser(undefined);

		router.push('/auth/login');
	};

	return (
		<div className='navbar navbar-expand navbar-dark bg-blend-lighte flex w-full bg-stone-400'>
			<ul className='navbar-nav h-15 flex w-full justify-start'>
				<li className='self-center'>
					<Link
						href='/'
						className='nav-item nav-link h-14 text-black p-5 hover:opacity-60'
					>
						Home
					</Link>
				</li>
				<li className='self-center'>
					<Link
						href='/posts'
						className='nav-item nav-link text-black p-5 hover:opacity-60'
					>
						Posts
					</Link>
				</li>
			</ul>

			<ul className='navbar-nav h-15 flex w-full justify-end'>
				{token || currentUser ? (
					<li className='self-center'>
						<button
							onClick={logoutHandler}
							className='nav-item nav-link text-black p-5 hover:opacity-60'
						>
							Logout
						</button>
					</li>
				) : (
					<>
						<li className='self-center p-5'>
							<Link
								href='/auth/login'
								className='nav-item nav-link text-black p-5 hover:opacity-60'
							>
								Login
							</Link>
						</li>
						<li className='self-center'>
							<Link
								href='/auth/register'
								className='nav-item nav-link text-black p-5 hover:opacity-60'
							>
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	);
}
