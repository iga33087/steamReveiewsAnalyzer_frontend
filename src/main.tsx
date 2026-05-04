import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router";
import HeaderBox from './components/HeaderBox';
import router from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/index.scss'


createRoot(document.getElementById('root')!).render(
  <>
    <HeaderBox />
    <div className="content">
      <RouterProvider router={router} />
    </div>
  </>,
)
