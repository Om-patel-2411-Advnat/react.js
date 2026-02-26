import Cart from "./components/Cart.jsx";
import CheckOut from "./components/CheckOut.jsx";
import Header from "./components/Header.jsx";
import Meal from "./components/Meal.jsx";
import { CartContextProvider } from './store/CartContext.jsx';
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meal />
        <Cart />
        <CheckOut />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
