import React from 'react'
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layouts/Main.jsx'
import Landing from './layouts/Landing.jsx'

import Home from './routes/Home.jsx'
import Register from './routes/Register.jsx'
import AplProfile from './routes/Profile.jsx';

const router = createBrowserRouter([
  {
    path: '/main',
    element: <Main />,
    children:[
      {
        path: '/main/home',
        element: <Home />,
      },
      {
        path: '/main/profile',
        element: <AplProfile />,
      },
    ],
  },
  {
    path: '/',
    element: <Landing />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
