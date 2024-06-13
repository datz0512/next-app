import Navbar from './navbar';
import Footer from './footer';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<main className='flex min-h-screen flex-col justify-relative relative bg-white'>
			<Navbar />
			<div className='bg-white text-black mb-10'>{children}</div>
			<Footer />
		</main>
	);
}
