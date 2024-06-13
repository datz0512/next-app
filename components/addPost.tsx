export default function AddPostComponent(props: any) {
	return (
		<div className='w-full max-w-xs m-auto rounded p-5 mt-40 bg-stone-400'>
			<h1 className='text-2xl font-bold text-center text-black'>
				{props.header}
			</h1>
			<form onSubmit={props.submit}>
				<div>
					<label className='block mb-2 text-black' htmlFor='title'>
						Title
					</label>
					<input
						className='w-full p-2 mb-6 text-black border-b-2 border-black outline-none focus:bg-gray-300'
						placeholder='enter title...'
						type='text'
						name='title'
						value={props.title}
						onChange={props.onChange}
					/>
				</div>

				<div>
					<label className='block mb-2 text-black' htmlFor='content'>
						Content
					</label>
					<textarea
						className='w-full p-2 mb-6 text-black border-b-2 border-black outline-none focus:bg-gray-300'
						placeholder='enter content...'
						name='content'
						cols={10}
						rows={5}
						value={props.content}
						onChange={props.onChange}
					/>
				</div>

				<div>
					<input
						className='w-full bg-black hover:opacity-70 text-white font-bold py-2 px-4 mb-6 rounded cursor-pointer'
						type='submit'
					/>
				</div>
			</form>
		</div>
	);
}
