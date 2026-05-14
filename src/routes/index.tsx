import { createBrowserRouter,} from "react-router";
import Report from '../views/Report'

export default createBrowserRouter([
  {
    path: "/report/:id",
    Component: Report,
  },
]);