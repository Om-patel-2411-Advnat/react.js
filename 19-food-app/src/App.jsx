import Header from "./components/Header.jsx";
import Meal from "./components/Meal.jsx";
import { CartContextProvider } from './store/CartContext.jsx';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Meal />
    </CartContextProvider>
  );
}

export default App;
