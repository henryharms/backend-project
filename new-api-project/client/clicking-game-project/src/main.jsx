import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import App from './App'
import Login from './Login'
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: '/game/:name',
    element: <App />
  }
])





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
