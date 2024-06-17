import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTokenStore } from '../store/token';
import { useEffect } from 'react';

export default function Navbar() {
	const router = useRouter();
	const { token, userId, setToken, setUserId, removeToken, removeUserId } =
		useTokenStore() as any;

	useEffect(() => {
		const localToken = localStorage.getItem('token');
		const localUserId = localStorage.getItem('userId');

		if (localToken && localUserId) {
			setToken(localToken);
			setUserId(localUserId);
		}
	}, [setToken, setUserId]);

	const logoutHandler = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		removeToken();
		removeUserId();

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
						href={`/posts/user/${userId}`}
						className='nav-item nav-link text-black p-5 hover:opacity-60'
					>
						My posts
					</Link>
				</li>
			</ul>

			<ul className='navbar-nav h-15 flex w-full justify-end'>
				{token ? (
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
