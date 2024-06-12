import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Navbar() {
	const router = useRouter();
	const [user, setUser] = useState(null);

	const registerHandler = () => {
		router.push('/auth/register');
	};

	const loginHandler = () => {
		router.push('/auth/login');
	};

	const logoutHandler = () => {
		localStorage.removeItem('user');
		router.push('/auth/login');
	};

	return (
		<nav className='navbar navbar-expand navbar-dark bg-dark'>
			<div className='navbar-nav'>
				<Link href='/' className='nav-item nav-link'>
					Home
				</Link>
				<Link href='/posts' className='nav-item nav-link'>
					Posts
				</Link>
				<a onClick={loginHandler} className='nav-item nav-link'>
					Login
				</a>
				<a onClick={registerHandler} className='nav-item nav-link'>
					Register
				</a>
				<a onClick={logoutHandler} className='nav-item nav-link'>
					Logout
				</a>
			</div>
		</nav>
	);
}
