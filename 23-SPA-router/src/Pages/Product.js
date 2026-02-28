import { Link } from "react-router-dom";

const products = [
    {id : '1' , title : 'Product-1'},
    {id : '2' , title : 'Product-2'},
    {id : '3' , title : 'Product-3'},
];

export default function Product(){
    return(
        <>
            <h1>This is Product Page</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <Link to={product.id}>{product.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}