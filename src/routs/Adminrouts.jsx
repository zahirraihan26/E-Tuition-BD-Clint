import React from 'react';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../Components/LoadingSpinner';
import useRole from '../hooks/useRole';
import ForbiddenPage from '../ForbiddenPage/ForbiddenPage';

const Adminrouts = ({ children }) => {
    const {loading} =useAuth();
   const { role, isRoleLoading } =useRole()
    if(loading || isRoleLoading){
        return<LoadingSpinner></LoadingSpinner>
    }

    if(role!=='admin'){
        return<ForbiddenPage></ForbiddenPage> 
    }
  return children;
};

export default Adminrouts;