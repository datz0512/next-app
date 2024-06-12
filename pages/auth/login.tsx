import { useState } from 'react';

export default function Login() {
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');

	const submitHandler = (event: any) => {
		event.preventDefault();
		const username = event.target.username.value;
		const password = event.target.password.value;
		console.log(username, password);
	};

	return (
		<>
			<div>
				<p>Welcome to the login page</p>
			</div>
			<form onSubmit={submitHandler}>
				<label htmlFor='username'>Username:</label>
				<input
					type='text'
					id='username'
					name='username'
					style={{ color: 'black' }}
				/>
				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					id='password'
					name='password'
					style={{ color: 'black' }}
				/>
				<button type='submit'>Login</button>
			</form>
		</>
	);
}
