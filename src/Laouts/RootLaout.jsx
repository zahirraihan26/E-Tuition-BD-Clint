import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navebar/Navbar';


const RootLaout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <section className='min-h-screen'>
                <Outlet></Outlet>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default RootLaout;<Outlet></Outlet>