// domain/news

import Link from 'next/link'

export default function NewsPage() {
    return (
        <>
            <h1>Hello!! this is news</h1>
            <ul>
                <li>
                    <Link href='/news/next-js'>Next.js is greate</Link>
                </li>
                <li>
                    <Link href='/news/Something-else'>Something else</Link>
                </li>            
            </ul>
        </>
    )
}