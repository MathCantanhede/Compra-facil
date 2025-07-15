import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import PageList from './pages/PageList.tsx'
import Editprice from './pages/Editprice.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path:'/Home',
    element: <Home/>
  },
  {
    path:'/Pagelist',
    element: <PageList/>
  },
  {
    path:'/Editprice',
    element: <Editprice/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
