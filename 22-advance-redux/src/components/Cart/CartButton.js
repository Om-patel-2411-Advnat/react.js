import classes from './CartButton.module.css';
import { useSelector , useDispatch} from 'react-redux';
import { cartAction } from '../store/uiSlice.js';

const CartButton = (props) => {

  const dispatch = useDispatch();

  const cartQuantity = useSelector(state => state.cart.totalQuantity)

  function HandleShowCart(){
    dispatch(cartAction.toggle())
  }

  return (
    <button className={classes.button} onClick={HandleShowCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
