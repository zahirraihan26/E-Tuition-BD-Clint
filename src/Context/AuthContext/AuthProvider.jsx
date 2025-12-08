import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';



const googleprovider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    
    const [user,setUser]= useState(null)
    const [loading ,setLoading] =useState(true)

       const registerUser = (email, password) => {
         setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

   const signInuser = (email, password) => {
         setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

      const signInGoogle =()=>{
         setLoading(true)
        return signInWithPopup(auth, googleprovider)
    }
   
     const logOut =()=>{
        setLoading(true)
       return signOut(auth)
    }

     const updateUserProfile =(profile) =>{
        return updateProfile(auth.currentUser,profile)
    }



     useEffect(()=>{
       const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
           setUser(currentUser)
           setLoading(false)
       })
       return ()=>{
        unSubscribe()
       }
    },[])


    const authInfo = {
        user,
        loading,
     registerUser,
     signInuser,
     signInGoogle,
     logOut,
     updateUserProfile
        
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;