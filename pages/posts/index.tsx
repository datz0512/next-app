import { useRouter } from 'next/router';

export default function Posts() {
	const router = useRouter();

	const addPostHandler = () => {
		router.push('/posts/add');
	};

	return (
		<div>
			<p>Welcome to the posts page</p>
			<button onClick={addPostHandler}>Add a Post</button>
		</div>
	);
}
