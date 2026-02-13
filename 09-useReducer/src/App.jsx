import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from './components/Product.jsx';
import CartContextProvider from './store/cart-contex.jsx';


function App() {
  
  return (
    // using context like component here will only work if you are using react version 19 or more it's not used that way in older version
    // for older version you have to use another property .Provider in order to wrap the components like <CartContext.Provider> ... </ CartContext.Provider>
    // you wrap all the components that are gonna use the value of context
    // you have to add this value prop here in order to pass the value
    // here the structure of state and the context is same so we can directly connect the value with the state
    // here we not want to use context to just reading the values but we also want update it using the state fro that we have to use the object as a value and pass it through the context
    // <CartContext value = {shoppingCart}>
    <CartContextProvider>
      <Header />
      {/* now we are not using it in order to reduce the prop drilling we are gonna use opening and closing tag method so we can manage products here  */}
      {/* <Shop onAddItemToCart={handleAddItemToCart} />        */}

      {/* this is called Component Composition   */}
      {/* we can not use this for more complex project because this will make our app file much more complex and at the end we will not be able to read it */}
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
