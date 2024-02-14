import type { Metadata } from 'next'
import { Concert_One } from 'next/font/google'
import './globals.css'

const concert = Concert_One({ weight: ['400'], subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'GOOEY TIME',
	description: 'Gooey effect for svg numbers',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={concert.className}>{children}</body>
		</html>
	)
}
