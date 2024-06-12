import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Register() {
	const router = useRouter();

	const submitHandler = async (e: any) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		// const res = await fetch('', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({ email, password }),
		// });
		// const data = await res.json();
		console.log(email, password);
		router.push('/account/login');
	};

	return (
		<div>
			<p>Welcome to the register page</p>
			<form onSubmit={submitHandler}>
				<label htmlFor='email'>Email:</label>
				<input type='text' id='email' name='email' style={{ color: 'black' }} />

				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					id='password'
					name='password'
					style={{ color: 'black' }}
				/>

				<label htmlFor='password'>Confirm Password:</label>
				<input
					type='password'
					id='confirmPassword'
					name='confirmPassword'
					style={{ color: 'black' }}
				/>
				<button type='submit'>Register</button>
			</form>
		</div>
	);
}
