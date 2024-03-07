import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, redirect, RouterProvider,} from 'react-router-dom';
import './index.css';
import axios from 'axios';

import App from './App';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Todo from './pages/Todo';
import Profile from './pages/Profile';
import Home from './pages/Home';
// import { useToast } from '@chakra-ui/react'

const router = createBrowserRouter([

  {

    path: '/',
    element: <App/>,
    // errorElement: 
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/signup',
        element: <Signup />
      }, 
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/profile',
        element: <Profile />,
        loader: async () => {
          // const navigate = useNavigate();
         const token = localStorage.getItem('token');
         if (token) {
          try {
            const response = await axios.get("http://localhost:3001/auth/profile", {
              headers: { Authorization:  `Bearer ${token}`}
              });
             redirect('/profile');
              return response.data;
          } catch (error) {
            console.log('ERROR', error);
            return redirect('/login');
          }} else {
            console.log('NO TOKEN');
            return redirect('/signup');
          }
        },
      },
      {
        // todo will eventually be a component that user can create todos on their profile
        // will be turned into modal
        path: '/todo',
        element: <Todo />,
        loader: async () => {
          // const navigate = useNavigate();
         const token = localStorage.getItem('token');
         if (token) {
          try {
            const response = await axios.get("http://localhost:3001/auth/user-todos", {
              headers: { Authorization:  `Bearer ${token}`}
              })
             redirect('/profile');
              return response.data;
          } catch (error) {
            console.log('ERROR', error);
            return redirect('/login');
          }} else {
            console.log('NO TOKEN');
            return redirect('/signup');
          }
        },
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
)


