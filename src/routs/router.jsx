import { createBrowserRouter } from "react-router";
import RootLaout from "../Laouts/RootLaout";
import Home from "../Pages/Home/Home/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import AuthLaout from "../Laouts/AuthLaout";
import Privetrouts from "./Privetrouts";
import BeATutor from "../Pages/BeATutor/BeATutor";
import Dashboardlaouts from "../Laouts/Dashboardlaouts";
import NewTuition from "../Pages/Dashboard/NewTuition/NewTuition";
import MyTuitions from "../Pages/Dashboard/MyTuitions/MyTuitions";
import Tuitions from "../Components/Tuitions/Tuitions";


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
          path:'/beatuitors',
          element:<Privetrouts><BeATutor></BeATutor></Privetrouts>
        },
        {
          path:"/tuitions",
          Component:Tuitions
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
  {
    path:'dashboard',
    element: <Privetrouts><Dashboardlaouts></Dashboardlaouts></Privetrouts>,
    children:[
      {
        path:'my-tuitions',
        Component:MyTuitions
      },
      {
        path:'new-tuition',
        Component:NewTuition
      }
    ]
  }
  
]);