import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import {QueryClientProvider } from '@tanstack/react-query';

import Posts from './routes/Posts.jsx'
import './index.css'
import NewPost from './routes/NewPost.jsx';
import RootLayout from './routes/RootLayout.jsx';
import PostDetails from './routes/PostDetails.jsx';
import { queryClient } from './Utils/http.js';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { 
        path: '/', 
        element: <Posts /> ,
        children : [
          { 
            path: '/create-post', 
            element: <NewPost /> ,
          },
          {
            path : '/:id',
            element : <PostDetails />,
          }
        ] 
      },
    ]
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
