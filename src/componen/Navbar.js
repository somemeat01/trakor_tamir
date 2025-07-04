import React from 'react'
import {Link} from 'react-router-dom';
import Logo from '../componen/Log';

 function Nav() {
  return ( 
    <div>
      <div style={{
      color: "white",
      paddingLeft:"2rem",
      backgroundColor:"#264274",
      justifyContent:"space-between",
      display:"flex",
      flexDirection:"row",
      boxShadow:"0 0 15px 15px rgba(0,0,0,.4)"
      }}>


      <div style={{
        display:"flex",
        flexDirection:"row",
        margin:5,
        justifyContent:"center",
        alignItems:"center",
        gap:25 }}>
      <Logo/>
      <div>
        <h3>SDF</h3>
        <h3 style={{marginLeft:20,}}>Yetkili Servis</h3>
      </div>
    </div>


    <div style={{
      
      marginLeft:"5rem",
      padding:1,
      width:"60%",
      display:"flex",
      justifyContent:"space-evenly",
      alignItems:"center",
      fontSize:"1.5rem",}}>
      <Link to="Hakkında"  style={{color:"white", textDecoration:"none"}}>Hakkımızda</Link>
      <Link to="/Kayıt" style={{color:"white", textDecoration:"none"}}>Kayıt Ol</Link>
      <Link to="/Giriş" style={{color:"white", textDecoration:"none"}}>Giriş Yap</Link>
      <Link to="/BizeKatıl" style={{color:"white", textDecoration:"none"}}>Bize Katıl</Link>

      </div>

    </div>
  </div>
  )
}
export default Nav;
 