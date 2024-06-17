import Link from 'next/link';

export default function Footer() {
	return (
		<footer className='bg-stone-400 shadow bottom-0 left-0 w-screen absolute'>
			<div className='mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
				<span className='text-sm text-black sm:text-center'>
					© 2024{' '}
					<Link href='/' className='hover:underline'>
						Footer
					</Link>
					. All Rights Reserved.
				</span>
				<ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-black sm:mt-0'>
					<li>
						<Link href='#' className='hover:underline me-4 md:me-6'>
							About
						</Link>
					</li>
					<li>
						<Link href='#' className='hover:underline me-4 md:me-6'>
							Privacy Policy
						</Link>
					</li>
					<li>
						<Link href='#' className='hover:underline me-4 md:me-6'>
							Licensing
						</Link>
					</li>
					<li>
						<Link href='#' className='hover:underline'>
							Contact
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}
