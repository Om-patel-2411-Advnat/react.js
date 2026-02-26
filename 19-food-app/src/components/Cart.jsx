import { useContext } from "react";
import Modal from "./UI/Model.jsx"; 
import CartContext from "../store/CartContext.jsx";
import { currancyFormatter } from './utils/formating.js';
import Button from "./UI/Button";
import UserProgressContext from '../store/UserProgressContext.jsx'
import CartItem from "./CartItem.jsx";

export default function Cart(){

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    function HandleHideCart(){
        userProgressCtx.hideCart();
    }

    function HandleGoToCheckout(){
        userProgressCtx.showCheckout();
    }

    const cartTotal = cartCtx.items.reduce((totalPrice , item)=>totalPrice + (item.quantity * item.price) ,0);  

    return(
        <Modal 
            className="cart" 
            open={userProgressCtx.progress === 'cart'} 
            onClose={userProgressCtx.progress === 'cart' ? HandleHideCart : null}

        >
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item => 
                    <CartItem 
                        key={item.id} 
                        item={item} 
                        onDecrease={() => cartCtx.removeItem(item.id)}
                        onIncrease={() => cartCtx.addItem(item)}
                    />
                )}
            </ul>
            <p className="cart-total">{currancyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textonly onClick={HandleHideCart}>Close</Button>
                {cartCtx.items.length > 0 && 
                    <Button onClick={HandleGoToCheckout}>Go To Checkout</Button>
                }
            </p>
        </Modal>
    )
}