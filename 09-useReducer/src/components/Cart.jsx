import { useContext } from "react";
// import { use } from 'react';
import { CartContext } from "../store/cart-contex.jsx";

export default function Cart() {

  // if(true){
  //   const cartCtx = useContext(CartContext);
  // }
  // this is not allowed

  // const cartCtx = useContext(CartContext);
  // insted of using a variable we directly destructure the value of context like given below

  const { items , UpdateCartItemQuantity } = useContext(CartContext);

  // this is allowed because use is flexible compare to other hooks
  // not available in older version than 19
  // if(true){
  //   const cartCtrx = use(CartContext);
  // }
  

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {/* we can use item.length if we are destructuring the items insted of using a variable  */}

      {/* if you are using a variable to store a context */}
      {/* {cartCtx.items.length === 0 && <p>No items in cart!</p>} */}

      {/* if you are using destructuring */}
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => UpdateCartItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => UpdateCartItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
