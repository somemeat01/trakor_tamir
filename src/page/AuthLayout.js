import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../firebase'

const AuthLayout = () => {
    const [user,isLoading] =useAuthState(auth);

    if(isLoading){
        return <h1>loading..</h1>
    }

    if(!user){
        return <Navigate to='/Kayıt' replace />;
    }
  return <Outlet/> ;
}
export default AuthLayout