import { createBrowserRouter,} from "react-router";
import Home from '../views/Home'
import Report from '../views/Report'

export default createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/report/:id",
    Component: Report,
  },
]);