// here we are facing problem that when ever user click on the link that we provide the whole react app will be re-execute again and this is a big problem so for solving that and just updating the URL and let react router do the work we can do something with another react feature 
import { Link , useNavigate } from 'react-router-dom';

export default function Home(){

    // if you wan to navigate programmatically  than you can us this navigation hook like this
    const navigate = useNavigate();

    function HandleNavigation(){
        navigate('products')
    }


    return (
        <>
            <h1>Hello</h1>
            {/* here we use <Link> instead of the <a> for overcome the problem that we define first */}
            {/* and Link doesn't have "href" attribute it instead it has "to" attribute */}
            {/* what Link does is it listens for the clicks of the element and prevents the browser default of sending http request if the link is clicked and instead simply take a look at the rout definition to update the page accordingly and load the appropriate content. It will change the URL but without sending any http requests  */}
            {/* always remember that this Link element always produce an <a> tag it's just prevents the default behavior of the browser */}
            <h2>click here for <Link to="products">Go to the Product page</Link></h2>

            {/* This button is only for programmatically navigation and an example that you can navigate like this also */}
            <button onClick={HandleNavigation}>Navigate</button>
        </>
    )
}