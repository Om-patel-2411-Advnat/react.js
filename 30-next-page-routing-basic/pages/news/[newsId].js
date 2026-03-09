// domain/news/something

// this is not a react router this is a router created by Next team
import { useRouter } from 'next/router';


export default function SomethingPage() {

    // we are using it to get the dynamic value of the URL
    const router = useRouter();

    const id = router.query.newsId;

    return (
        <h1>Hello!! this is Something</h1>
    )
}