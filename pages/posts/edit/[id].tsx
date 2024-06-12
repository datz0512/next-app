import { useRouter } from 'next/router';

export default function EditPost() {
	const router = useRouter();
	return (
		<div>
			<p>Edit a post with id: {router.query.id}</p>
		</div>
	);
}
