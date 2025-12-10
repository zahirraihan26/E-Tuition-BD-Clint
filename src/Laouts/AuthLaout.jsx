import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navebar/Navbar';


const AuthLaout = () => {
    return (
        <div className=' min-h-screen'> 
          
            <div>
                 <Navbar></Navbar>
                <div className='p-4'><Outlet></Outlet></div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default AuthLaout;