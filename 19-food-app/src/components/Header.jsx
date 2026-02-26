import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx'; 
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header(){

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    let totalItems = cartCtx.items.reduce((totalMealItems , item)=>{
        return totalMealItems + item.quantity ;
    } ,0);

    function HandleShowCart(){
        userProgressCtx.showCart();
    }

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logo} alt="image" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textonly onClick={HandleShowCart}>Cart ({totalItems})</Button>
            </nav>
        </header>
    )
}