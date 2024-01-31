import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';
import Login from './pages/Login';
import Todo from './pages/Todo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    // errorElement: 
    children: [
      {
        index: true,
        element: <Login />
      }, 
      {
        path: '/todo',
        element: <Todo />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
)


