// this hook is used for getting the details 
// this is basically used for getting the data from the URL
import { Link, useParams } from "react-router-dom"

export default function ProductDetailsPage(){

    const params = useParams();

    // here we choose :id because we have used id as a dynamic value for the path 
    // params.id
 
    return(
        <>
            <h1>Product Details....</h1>
            <p>{params.id}</p>
            {/* this is a relative path and this path is used to go back to the parent path keep in mind to the parent path not the siblings */}
            {/* here in relative if we set  " path " than it will do one step back into the path not directly to the parent */}
            {/* but if we use route it will go back to the parent path */}
            <Link to=".." relative="path">Back</Link>
        </>
    )
}