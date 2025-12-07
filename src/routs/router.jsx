import { createBrowserRouter } from "react-router";
import RootLaout from "../Laouts/RootLaout";
import Home from "../Pages/Home/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLaout,
    children:[
        {
          index: true,
          Component:Home
        },
    ]
  },
]);