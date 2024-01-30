import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: 
    children: [
      {
        index: true,
        element: <App />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
)


