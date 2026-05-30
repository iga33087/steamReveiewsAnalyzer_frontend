//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router";
import { Provider } from 'react-redux'
import router from './routes'
import store from './store/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/index.scss'

createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>,
)
