import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export default function Register() {
	const router = useRouter();
	const [email, setEmail] = useState('');

	const inputRef = useRef(null);

	const submitHandler = async (e: any) => {
		e.preventDefault();

		const email = e.target.email.value.trim();
		const password = e.target.password.value.trim();
		const confirmPassword = e.target.confirmPassword.value.trim();

		if (!email || !password || !confirmPassword)
			return alert('Please fill in all fields');

		if (password !== confirmPassword) return alert('Passwords do not match');

		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password }),
				}
			);
			const user = await res.json();

			if (user.message) throw new Error(user.message);

			router.push('/auth/login');
		} catch (error) {
			return alert(error);
		}
	};

	return (
		<div className='w-full max-w-xs m-auto rounded p-5 mt-40 bg-stone-400'>
			<h1 className='text-2xl font-bold text-center text-black'>Register</h1>
			<form onSubmit={submitHandler}>
				<div>
					<label className='block mb-2 text-black' htmlFor='email'>
						Email
					</label>
					<input
							ref={inputRef}
						className='w-full p-2 mb-6 text-black border-b-2 border-black outline-none focus:bg-gray-300'
						placeholder='enter email...'
						type='email'
						name='email'
						value={email}
						onChange={e => e.target.value}
					/>
				</div>

				<div>
					<label className='block mb-2 text-black' htmlFor='password'>
						Password
					</label>
					<input
						className='w-full p-2 mb-6 text-black border-b-2 border-black outline-none focus:bg-gray-300'
						placeholder='enter password...'
						type='password'
						name='password'
					/>
				</div>

				<div>
					<label className='block mb-2 text-black' htmlFor='confirmPassword'>
						Confirm password
					</label>
					<input
						className='w-full p-2 mb-6 text-black border-b-2 border-black outline-none focus:bg-gray-300'
						placeholder='enter password again...'
						type='password'
						name='confirmPassword'
					/>
				</div>
				<div>
					<input
						className='w-full bg-black hover:opacity-70 text-white font-bold py-2 px-4 mb-6 rounded cursor-pointer'
						type='submit'
					/>
				</div>
			</form>

			<div className='mb-3'>
				<Link
					className='text-black hover:opacity-70 text-sm float-right'
					href='/auth/login'
				>
					Already have an account?
				</Link>
			</div>
		</div>
	);
}
