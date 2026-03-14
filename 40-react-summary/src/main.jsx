import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';

import Posts , {loader as LoadingPosts} from './routes/Posts'
import './index.css'
import NewPost , { action as newPostAction } from './routes/NewPost';
import RootLayout from './routes/RootLayout';
import PostDetails , {loader as LoadingDetails} from './routes/PostDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { 
        path: '/', 
        element: <Posts /> ,
        loader: LoadingPosts ,
        children : [
          { 
            path: '/create-post', 
            element: <NewPost /> ,
            action: newPostAction ,
          },
          {
            path : '/:id',
            element : <PostDetails />,
            loader: LoadingDetails,
          }
        ] 
      },
    ]
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
