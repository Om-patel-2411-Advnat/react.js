import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';

export default function Header(){

    const cartCtx = useContext(CartContext);

    let totalItems = cartCtx.items.reduce((totalMealItems , item)=>{
        return totalMealItems + item.quantity ;
    } ,0)

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logo} alt="image" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textonly>Cart ({totalItems})</Button>
            </nav>
        </header>
    )
}