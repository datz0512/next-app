import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Register() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const submitHandler = async (e: any) => {
		e.preventDefault();
		const username = e.target.username.value;
		const password = e.target.password.value;
		// const res = await fetch('', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({ username, password }),
		// });
		// const data = await res.json();
		console.log(username, password);
		router.push('/account/login');
	};

	return (
		<div>
			<p>Welcome to the register page</p>
			<form onSubmit={submitHandler}>
				<label htmlFor='email'>Email:</label>
				<input
					type='text'
					value={email}
					id='email'
					name='email'
					onChange={e => setEmail(e.target.value)}
					style={{ color: 'black' }}
				/>

				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					value={password}
					id='password'
					name='password'
					onChange={e => setPassword(e.target.value)}
					style={{ color: 'black' }}
				/>

				<label htmlFor='password'>Confirm Password:</label>
				<input
					type='password'
					value={confirmPassword}
					id='confirmPassword'
					name='confirmPassword'
					onChange={e => setConfirmPassword(e.target.value)}
					style={{ color: 'black' }}
				/>
				<button type='submit'>Register</button>
			</form>
		</div>
	);
}
