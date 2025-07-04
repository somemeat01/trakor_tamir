import React from 'react';
import About from './componen/Hakkında';
import Navbar from './componen/Navbar';
import Register from './componen/Kayıt';
import Login from './componen/Giriş';
import BizeKatıl from './componen/BizeKatıl'
import ForgotPassword from './componen/ForgotPassword'
import AuthLayout from './page/AuthLayout'
import { AuthProvider } from './componen/AuthContext';
import Home from './componen/Home'
import {BrowserRouter as Router , Route , Routes} from "react-router-dom";
function App() {
  
  return (
   <div>
    <AuthProvider>
    <Router>
     <Navbar/>
    <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/Hakkında' element={<About/>}/>
        <Route path='/Kayıt' element={<Register/>}/>
        <Route path='/Giriş' element={<Login />}/>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>

       

        <Route path='/' element={<AuthLayout/>}>
          <Route path='/BizeKatıl' element={<BizeKatıl/>}/>
        </Route>

        
    </Routes>
    </Router>
    </AuthProvider>
   </div>
  );
}

export default App;
