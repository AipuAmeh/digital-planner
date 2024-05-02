import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, redirect, RouterProvider, } from 'react-router-dom';
import './index.css';
import axios from 'axios';

import App from './App';
import Error from './pages/Error';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Todo from './pages/Todo';
import Profile from './pages/Profile';
import Home from './pages/Home';
import ResetPassword from './pages/ResetPassword';
import CompletedTodos from './pages/CompletedTodos';

const router = createBrowserRouter([

  {

    path: '/',
    element: <App />,
    errorElement: <Error />,
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
          const token = localStorage.getItem('token');
          if (token) {
            try {
              const response = await axios.get("http://localhost:3001/auth/profile", {
                headers: { Authorization: `Bearer ${token}` }
              });
              const user = response.data;
              const options = {
                method: 'GET',
                url: 'https://labs.bible.org/api/?',
                params: {
                  passage: 'votd',
                  formatting: 'plain'
                },
                origin: true
              };
              const verse = await axios.request(options);
              const verseData = verse.data
              return { user, verseData };
            } catch (error) {
              console.error(error);
              return redirect('/login');
            }
          } else {
            return redirect('/signup');
          }
        },
      },
      {
        path: '/todo',
        element: <Todo />,
        loader: async () => {
          try {
            const token = localStorage.getItem('token');
            const user = await axios.get("http://localhost:3001/auth/user-todos", {
              headers: { Authorization: `Bearer ${token}` }
            });
            const todos = await axios.get(`http://localhost:3001/todo/find-user-projects/${user.data.id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            return { user, todos };
          } catch (error) {
            console.error(error);
          }
        },
      },
      {
        path: '/reset-password/:token/:id',
        element: <ResetPassword />
      },
      {
        path: '/completed-todos',
        element: <CompletedTodos />,
        loader: async () => {
          try {
            const token = localStorage.getItem('token');
            const user = await axios.get("http://localhost:3001/auth/user-todos", {
              headers: { Authorization: `Bearer ${token}` }
            });
            const todos = await axios.get(`http://localhost:3001/todo/find-user-projects/${user.data.id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            return {todos, user};
          } catch (error) {
            console.error(error);
          }
        }
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
)


