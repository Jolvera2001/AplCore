import React from 'react'
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root.jsx'
import Home from './routes/Home.jsx'
import Register from './routes/Register.jsx'
import AplProfile from './routes/Profile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children:[
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/profile',
        element: <AplProfile />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
