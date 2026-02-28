// this will help to create routes of pages 
import { createBrowserRouter } from 'react-router-dom';
// this is like the other components 
import { RouterProvider } from 'react-router-dom';
// you can also create routes with the help of this but this is used in older versions 
// import { createRoutesFromElements, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Product from './Pages/Product';
import RootElemet from './Pages/Root';
import ErrorPage from './Pages/Error';
import ProductDetailsPage from './Pages/ProductDetails';

// // you can create routes like this but it's older version 
// const routDefination = createRoutesFromElements(
//   <Route >
//     <Route path='/' element={<Home />}/>
//     <Route path='/products' element={<Product />}/>
//   </Route>
// )
// const router = createBrowserRouter(routDefination);

// we can define routes like this and this is preferred solution
const router = createBrowserRouter([
  // now for making nested elements we can do this 

  // absolute Path :- An absolute path is a route path that starts from the root (/) of the application, regardless of where it is used.
  // meaning :- go directly to this " http://localhost:5173/products "

  // Relative Path :- A relative path is resolved relative to the current route (parent route). it does not start's with ( / ) ,it appends the new path with the parent path
  // meaning :- If current URL is: " http://localhost:5173/products "  Result becomes: " http://localhost:5173/products/details "

  {
    path : '/',
    element : <RootElemet />,
    // this is another in-build argument of router for showing fallback page if any error occurred
    errorElement : <ErrorPage /> ,
    children : [
      // here we create object for every single rout we want to create
      // first value is path and there are many other properties of the rout the second argument is which component you want to load for that rout for that we use " element " prop
      // {path : '' , element : <Home /> },

      // the upper path works fine but when here home page has no path so for just home page page we can use index property which will turn the route in so called index route
      // this will be set to the parent route when ever the parent route is active
      {index : true , element : <Home /> },
      {path : 'products' , element : <Product />},
      // now  here you want to apply path for the product details but for every single product there should be a different path and we can not decide there path by hard coding that's why we can set path dynamically like this by providing " : " and than identifier
      {path : 'products/:id' , element : <ProductDetailsPage />} 
    ] 
  }
])


function App() {
  // this routerProvider has a special prop called router and the value that we pass should be the created router with the help of createBrowserRouter 
  return <RouterProvider router={router} />;
}

export default App;
