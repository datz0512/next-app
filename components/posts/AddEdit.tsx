import { useRouter } from 'next/router';

export { AddEdit };

function AddEdit(props: any) {
	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		const res = await fetch('', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		const data = await res.json();
		console.log(data);
		router.push('/account/login');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='form-row'>
				<div className='form-group col'>
					<label>First Name</label>
					<input name='firstName' type='text' className={`form-control `} />
					<div className='invalid-feedback'></div>
				</div>
				<div className='form-group col'>
					<label>Last Name</label>
					<input name='lastName' type='text' className={`form-control `} />
				</div>
			</div>
			<div className='form-row'>
				<div className='form-group col'>
					<label>Email</label>
					<input name='email' type='text' className={`form-control `} />
				</div>
				<div className='form-group col'>
					<label>Password</label>
					<input name='password' type='password' className={`form-control`} />
				</div>
			</div>
			<div className='form-group'>
				<button type='submit' className='btn btn-primary mr-2'>
					Save
				</button>
			</div>
		</form>
	);
}
