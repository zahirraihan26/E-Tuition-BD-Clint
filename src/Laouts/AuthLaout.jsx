import React from 'react';
import { Outlet } from 'react-router';

const AuthLaout = () => {
    return (
        <div className=' min-h-screen'> 
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLaout;