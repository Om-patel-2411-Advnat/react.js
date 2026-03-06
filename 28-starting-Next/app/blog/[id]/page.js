import Link from "next/link";

// for creating dynamic route you have to create folder name like this " [ identifier ] "

// here in dynamic pages yo always get a prop and you can get many things from that prop and one of them is params and by using dynamic values you cas access the dynamic page 
export default function BlogPostPage({params}){
    return (
        <main>
            <h1>Blog Posts</h1>
            <p>{params.id}</p>
            <Link href='./'>Back</Link>
        </main>
    )
}