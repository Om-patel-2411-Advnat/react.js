// import { DUMMY_PRODUCTS } from '../dummy-products.js';
// import Product from './Product.jsx';

export default function Shop({ children }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {children}
        {/* here for reducing the prop Drilling we are moving this list products to the app component and use this component as a wraper here */}
        {/* {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))} */}
      </ul>
    </section>
  );
}
