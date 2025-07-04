import React from 'react'
import { useCallback } from 'react'
import {auth} from '../firebase'
import {signOut} from 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
const Home = () => {
  const [user,isLoading] =useAuthState(auth);

  const handleSignOut=useCallback(() => {
    signOut(auth);
  },[]);

  if(isLoading){
    return <h1>loading..</h1>
}

  return (
    <div>
        <h1>home</h1>
        
        <button onClick={handleSignOut}>çıkış yap</button>    
    </div>
  )
}

export default Home