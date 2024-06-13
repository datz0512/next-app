import { useRouter } from 'next/router';
import { useTokenStore } from '../../store/token';

export default function Login() {
	const router = useRouter();
	const { setToken } = useTokenStore() as any;

	const submitHandler = async (event: any) => {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;

		try {
			const res = await fetch(`http://127.0.0.1:3333/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});
			const response = await res.json();
			console.log(response);
			if (response.message) return alert(response.message);
			if (response.token && response.user) {
				localStorage.setItem('token', response.token);
				localStorage.setItem('userId', JSON.stringify(response.user.id));
				setToken(response.user.id);
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
						type='text'
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
					<input
						className='w-full bg-black hover:opacity-70 text-white font-bold py-2 px-4 mb-6 rounded cursor-pointer'
						type='submit'
					/>
				</div>
			</form>
			<footer className='mb-3'>
				<a
					className='text-black hover:opacity-70 text-sm float-right'
					href='/auth/register'
				>
					Create account
				</a>
			</footer>
		</div>
	);
}
