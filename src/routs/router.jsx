import { createBrowserRouter } from "react-router";
import RootLaout from "../Laouts/RootLaout";
import Home from "../Pages/Home/Home/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import AuthLaout from "../Laouts/AuthLaout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLaout,
    children:[
        {
          index: true,
          Component:Home
        },
        {
            path:"/about",
            Component:AboutUs
        }
    ]
  },
  {
    path:'/',
    Component:AuthLaout,
    children:[
        {
            path:'login',
            Component:Login

        },
        {
            path:'register',
            Component:Register
        }
    ]
  },
  
]);