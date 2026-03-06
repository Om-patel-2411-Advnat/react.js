import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// for making lazy loading available we have to comment this out otherwise it will be loaded all the time 
// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';
import { lazy, Suspense } from 'react';

// here import function gives us a promise that's why this is not valid is use just like this 
// const BlogPage = ()=> import('./pages/Blog.js')

// fro solve this problem react gives us a special function which we have to wrap around this import function and that's lazy function which is imported from react
// lazy is executed and takes this function with the dynamic import as an argument  
const BlogPage = lazy(()=> import('./pages/Blog.js'));

const PostPage = lazy(()=>import('./pages/Post.js'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          // you can call import as a function like we do here and it always returns a promise so we can use .then method on it and by doing that it will import dynamically when it's needed not before that
          // an inside of the then we get the loaded module so the loaded file in the end and now than we will return loader function that should be executed and at the end loader function also returns a promise 
          { 
            index: true, 
            // now we have created the component upper so this will be working but it will take time so we have to wrap it around Suspense
            element: (
              <Suspense fallback={<p>Loading....</p>}>
                <BlogPage />
              </Suspense>
            ), 
            loader: ()=>import('./pages/Blog.js').then(module => module.loader())},
          { 
            path: ':id', 
            element: (
              <Suspense fallback={<p>Fetching.....</p>}>
                <PostPage />
              </Suspense>
            ), 
            // here we can also send the params and instead of sending just params we can send the whole meta data which contain all the info about params and all
            // we have to pass this meta data here because this component needs id from the URL in order to print the data so we have to pass it 
            loader: (meta)=>import('./pages/Post.js').then(module => module.loader(meta)),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
