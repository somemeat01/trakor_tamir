// Kayıt.js (React frontend)
import React, { Component } from 'react';
import kayıt from '../resim/kayıt.jpg';
import logo from '../resim/Likya.png';
import {useState,useCallback} from 'react'
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {auth,db} from '../firebase'
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import {Link} from 'react-router-dom';

const ref= collection(db,"posts");

const Kayıt = () => {
  const [ad,setAd] = useState("");
  const [soyad,setSoyad] = useState("");
  const [il,setİl] = useState("");
  const [ilçe,setİlçe] = useState("");
  const [mahalle,setMahalle] = useState("");
  const [tür,setTür] = useState("");
  const [tel,setTel] = useState("");
  const [email,setEmail] = useState("");
  const [şifre,setŞifre] = useState("");

    const handleSubmit=useCallback((e)=>{
      e.preventDefault()
      console.log(email,şifre);
      if(!email || !şifre){
          return;
      }

      addDoc(ref,{
        ad: ad,
        soyad: soyad,
        il: il,
        ilçe: ilçe,
        mahalle: mahalle,
        tür: tür,
        tel: tel,
        email:email,
        şifre: şifre,
    });

      createUserWithEmailAndPassword(auth,email,şifre)
      .then((auth)=>{
          alert("kayıt başarılı")
          updateProfile(auth.user, {displayName:ad});
      })
      .catch((e)=>{
          console.log(e)
      })
  },[ad,soyad,il,ilçe,mahalle,tür,tel,email,şifre])
  return (
    <div style={{
      backgroundImage: `url(${kayıt})`,
      width: '100%',
      height: '90vh',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        height: "100%",
        justifyContent: "center"
      }}>

        <div className="col-md-6">

          <form onSubmit={handleSubmit} style={{
            background: "red",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: 1,
            width: "90%",
            hight: "60%",
          }}>
            <img src={logo} style={{
              width: "100%",
              height: "15rem"
            }} alt="Logo" />

            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: 'center',
              justifyContent: "space-between"
            }}>
              <div className="form-group" style={{ width: "42%" }}>
                <label htmlFor="ad">AD</label>
                <input type="text" className="form-control" id="ad" placeholder="kullanıcı ad" value={ad} onChange={(e)=> setAd(e.currentTarget.value)} />
              </div>
              <div className="form-group" style={{ width: "42%" }}>
                <label htmlFor="soyad">SOYAD</label>
                <input type="text" className="form-control" id="soyad" placeholder="kullanıcı soyad" value={soyad} onChange={(e)=> setSoyad(e.currentTarget.value)} />
              </div>
            </div>

            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: 'center',
              justifyContent: "space-between"
            }}>
              <div className="form-group" style={{ marginRight: "20px" }}>
                <label htmlFor="il">İL:</label>
                <input type="text" className="form-control" id="il" placeholder="İL" value={il} onChange={(e)=> setİl(e.currentTarget.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="ilçe">İLÇE</label>
                <input type="text" className="form-control" id="ilçe" placeholder="ilçe" value={ilçe} onChange={(e)=> setİlçe(e.currentTarget.value)} />
              </div>
              <div className="form-group" style={{ marginLeft: "20px" }}>
                <label htmlFor="mahalle">MAHALLE</label>
                <input type="text" className="form-control" id="mahalle" placeholder="mahalle" value={mahalle} onChange={(e)=> setMahalle(e.currentTarget.value)} />
              </div>
            </div>

            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: 'center',
              justifyContent: "space-between"
            }}>
            <div className="form-group" style={{ width: "42%" }} >
              <label htmlFor="tür">TRAKTÖR TÜRÜ</label>
              <input type="text" className="form-control" id="tür" placeholder="traktör türü" value={tür} onChange={(e)=> setTür(e.currentTarget.value)} />
            </div>

            <div className="form-group" style={{ width: "42%" }}>
              <label htmlFor="tel">TELEFON</label>
              <input type="tel" className="form-control" id="tel" placeholder="telefon numarası" value={tel} onChange={(e)=> setTel(e.currentTarget.value)} />
            </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">email</label>
              <input type="tel" className="form-control" id="email" placeholder="email gir" value={email} onChange={(e)=> setEmail(e.currentTarget.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="şifre">password:</label>
              <input type="password" className="form-control" id="şifre" placeholder="password" value={şifre} onChange={(e)=> setŞifre(e.currentTarget.value)} />
            </div>

            <div className="form-group" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingLeft: "5px", paddingRight: "5px" }}>
              <div className="form-check disabled" style={{ marginTop: "10px" }}>
                <label className="form-check-label" htmlFor="term">
                  <input type="checkbox" defaultChecked className="form-check-input" id="term" />
                  site kurallarını kabul et
                </label>
              </div>
              <button type="submit" className="btn btn-success" style={{
                width: "10rem"
              }}>KAYIT OL </button>
              <Link to="/Giriş" style={{marginRight: "2rem",color:"pink"}}> =giriş= </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Kayıt