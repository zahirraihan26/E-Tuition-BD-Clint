import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const Tuitorrouts = ({children}) => {
     const {loading} =useAuth();
   const { role, isRoleLoading } =useRole()
    if(loading || isRoleLoading){
        return<LoadingSpinner></LoadingSpinner>
    }

    if(role!=='tutor'){
        return<ForbiddenPage></ForbiddenPage> 
    }
  return children;
};

export default Tuitorrouts;