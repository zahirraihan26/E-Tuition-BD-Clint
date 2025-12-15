import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../Components/LoadingSpinner';
import ForbiddenPage from '../ForbiddenPage/ForbiddenPage';

const Studenrouts = ({children}) => {
    const {loading} =useAuth();
   const { role, isRoleLoading } =useRole()
    if(loading || isRoleLoading){
        return<LoadingSpinner></LoadingSpinner>
    }

    if(role!=='student'){
        return<ForbiddenPage></ForbiddenPage> 
    }
  return children;
};


export default Studenrouts;