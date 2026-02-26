import { useContext , useActionState } from "react";
import CartContext from "../store/CartContext.jsx";
import Modal from "./UI/Model";
import { currancyFormatter } from "./utils/formating.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

export default function CheckOut(){

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const { data, error, sendRequest, clearData } = useHttp(
        'http://localhost:3000/orders',
        requestConfig
        );

    const cartTotal = cartCtx.items.reduce((total , item) => total + (item.quantity * item.price) ,0);

    function HandleColse(){
        userProgressCtx.hideCheckout();
    }
    function HandleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    async function checkoutAction(prevdata , fd){

        const customerData = Object.fromEntries(fd.entries());
        
        await sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                },
            })
        );
    }
    // here isSending is a pending state
    const [formState , formAction , isSending] = useActionState(checkoutAction , null);

    let actions = (
        <>
            <Button type="button" textonly onClick={HandleColse}>Close</Button>
            <Button>Submit Order</Button> 
        </>
    );

    if(isSending){
        actions = <span>Sendin Data...</span>;
    }

    if (data && !error) {
        return (
            <Modal
                open={userProgressCtx.progress === 'checkout'} 
                onClose={HandleFinish}
            >
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>
                    We will get back to you with more details via email within the next
                    few minutes.
                </p>
                <p className="modal-actions">
                    <Button onClick={HandleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }

    return(
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={HandleColse}>
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total Amount :{currancyFormatter.format(cartTotal)} </p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="E-mail address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>

                {error && <Error title="Failed to send data..." message={error} />}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
}