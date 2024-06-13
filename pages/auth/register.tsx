import { useRouter } from 'next/router';

export default function Register() {
	const router = useRouter();

	const submitHandler = async (e: any) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		const confirmPassword = e.target.confirmPassword.value;

		if (password !== confirmPassword) return alert('Passwords do not match');

		const res = await fetch(`http://127.0.0.1:3333/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		const user = await res.json();
		console.log(user);
		router.push('/auth/login');
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
					<label className='block mb-2 text-black' htmlFor='confirmPassword'>
						Confirm password :
					</label>
					<input
						className='w-full p-2 mb-6 text-black border-b-2 border-black outline-none focus:bg-gray-300'
						placeholder='enter password...'
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
			<footer className='mb-3'>
				<a
					className='text-black hover:opacity-70 text-sm float-right'
					href='/auth/register'
				>
					Already have an account?
				</a>
			</footer>
		</div>
	);
}
