import { createBrowserRouter,} from "react-router";
import Layout from '../layout/Layout'
import Home from '../views/Home'
import Report from '../views/Report'
import ReportList from '../views/ReportList'

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/reportList',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ReportList />,
      },
    ],
  },
  {
    path: '/report/:id',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Report />,
      },
    ],
  }
]);