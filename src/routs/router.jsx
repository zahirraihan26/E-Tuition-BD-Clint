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
import AppliedTutors from "../Pages/Dashboard/AppliedTutors/AppliedTutors";
import TutorApplications from "../Pages/Dashboard/TutorApplications/TutorApplications";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import Studentpaymenthistory from "../Pages/Dashboard/Studentpaymenthistory/Studentpaymenthistory";
import TutorRevenue from "../Pages/Dashboard/TutorRevenue/TutorRevenue";
import Profile from "../Pages/Dashboard/Common/Profile";
import TuitionManagement from "../Pages/Dashboard/TuitionManagement/TuitionManagement";
import UserManagement from "../Pages/Dashboard/UserManagement/UserManagement";
import Updateprofile from "../Pages/Dashboard/Common/Updateprofile";
import ReportsAnalytics from "../Pages/Dashboard/ReportsAnalytics/ReportsAnalytics";
import Viewdetails from "../Components/TuitionsCard/Viewdetails";
import Tuitorlisting from "../Components/Tuitrlisting/Tuitorlisting";
import Adminrouts from "./Adminrouts";
import Tuitorrouts from "./Tuitorrouts";
import Error from "../Components/Homepagedata/Error";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLaout,
    children: [
      {
        index: true,
        Component: Home
      },

      {
        path: "/tuitions",
        Component: Tuitions
      },
      {
        path: "/tuitions/:id",
        Component: Viewdetails
      },
      {
        path: "tutor-listing",
        Component: Tuitorlisting
      },
      {
        path: "/about",
        Component: AboutUs
      },
          {
        path: '*',
        element: <Error></Error>
      },
    ]
  },
  {
    path: '/',
    Component: AuthLaout,
    children: [
      {
        path: 'login',
        Component: Login

      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: 'dashboard',
    element: <Privetrouts><Dashboardlaouts></Dashboardlaouts></Privetrouts>,
    children: [
      {
        path: 'my-tuitions',
        Component: MyTuitions
      },
      {
        path: 'new-tuition',
        Component: NewTuition
      },
      {
        path: 'applied-tutors',
        Component: AppliedTutors
      },
      // payment
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      // student payment history 
      {
        path: 'student-paymenthistory',
        Component: Studentpaymenthistory
      },
      // techer section
      {
        path: 'tutor-applications',
        // Component:TutorApplications,
        element: <Tuitorrouts><TutorApplications></TutorApplications></Tuitorrouts>
      },
      // tuitor payment history 
      {
        path: 'tutor-revenue',
        // Component:TutorRevenue
        element: <Tuitorrouts><TutorRevenue></TutorRevenue></Tuitorrouts>
      },


      // Admin page 
      {
        path: 'user-management',
        // Component:UserManagement
        element: <Adminrouts><UserManagement></UserManagement></Adminrouts>
      },
      {
        path: 'tuition-management',
        // Component:TuitionManagement
        element: <Adminrouts><TuitionManagement></TuitionManagement></Adminrouts>
      },
      {
        path: 'reports-analytics',
        // Component:ReportsAnalytics
        element: <Adminrouts><ReportsAnalytics></ReportsAnalytics></Adminrouts>
      },
      {
        path: 'profile',
        element: (
          <Privetrouts>
            <Profile />
          </Privetrouts>
        ),


      },
  

    ]
  }

]);