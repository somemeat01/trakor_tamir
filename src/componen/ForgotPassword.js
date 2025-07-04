import React from 'react'
import { Link } from 'react-router-dom'
import {useState,useCallback} from 'react'
import {sendPasswordResetEmail} from 'firebase/auth'
import {auth} from '../firebase'

const ForgotPassword = () => {
    const [email,setEmail] = useState("");

    const handleSubmit=useCallback((e)=>{
        e.preventDefault()
        console.log(email);
        if(!email){
            return;
        }

        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert("yeni şifre gönderildi")
        })
        .catch((e)=>{
            console.log(e)
        })
    },[email])
  return (
    <div style={{ 
        display: "flex", 
        flexDirection: "row",
        alignItems: 'center',
        justifyContent:"center",
       }}>

        <div className="col-md-6">
          <div className="container" style={{
            backgroundColor:"red",
            marginTop:"10rem",
            width:"40rem",
            height:"20rem",
            display: "flex", 
            alignItems: 'center',
            justifyContent:"center"
            }}>
            <form onSubmit={handleSubmit} style={{
              backgroundColor:"white",
              display: "flex", 
              alignItems: 'center',
              justifyContent:"center",
              flexDirection: "column",
              width:"100%"
              }}>
             
              <div className="form-group" style={{marginRight:"10px",width:"60%"}}>
                <label htmlFor="email">email</label>
                <input type="text" className="form-control" value={email} onChange={(e)=> setEmail(e.currentTarget.value)} placeholder="email"/>
              </div>             

               <button type="submit" className="btn btn-success" style={{
                  marginRight:"30%",
                  marginTop:"10px",
                  marginLeft:"30%",
                  width:"15rem"}}>emaile yeni şifre gönder</button>
                  <Link to="/Giriş">giriş'e git</Link>
            </form>
          </div>

        </div>
      </div>
  )
}

export default ForgotPassword