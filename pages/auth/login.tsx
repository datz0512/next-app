import { useRouter } from 'next/router';
import { useTokenStore } from '../../store/token';
import Link from 'next/link';

export default function Login() {
	const router = useRouter();
	const { setToken, setUserId } = useTokenStore() as any;

	const submitHandler = async (event: any) => {
		event.preventDefault();
		const email = event.target.email.value.trim();
		const password = event.target.password.value.trim();

		if (!email || !password) return alert('Please fill in all fields');

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});
			const response = await res.json();

			if (response.message) return alert(response.message);

			if (response.token && response.user) {
				localStorage.setItem('token', response.token);
				localStorage.setItem('userId', response.user.id);
				setToken(response.token);
				setUserId(response.user.id);
				router.push('/');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='w-full max-w-xs m-auto rounded p-5 mt-40 bg-stone-400'>
			<h1 className='text-2xl font-bold text-center text-black'>Login</h1>
			<form onSubmit={submitHandler}>
				<div>
					<label className='block mb-2 text-black' htmlFor='email'>
						Email
					</label>
					<input
						className='w-full p-2 mb-6 text-black border-b-2 border-black outline-none focus:bg-gray-300'
						placeholder='enter email...'
						type='email'
						name='email'
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
					<button
						className='w-full bg-black hover:opacity-70 text-white font-bold py-2 px-4 mb-6 rounded cursor-pointer'
						type='submit'
					>
						Submit
					</button>
				</div>
			</form>

			<div className='mb-3'>
				<Link
					className='text-black hover:opacity-70 text-sm float-right'
					href='/auth/register'
				>
					Create account
				</Link>
			</div>
		</div>
	);
}
