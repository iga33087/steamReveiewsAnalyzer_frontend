import { createBrowserRouter,} from "react-router";
import Home from '../views/Home'
import Report from '../views/Report'
import ReportList from '../views/ReportList'

export default createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/reportList",
    Component: ReportList,
  },
  {
    path: "/report/:id",
    Component: Report,
  },
]);