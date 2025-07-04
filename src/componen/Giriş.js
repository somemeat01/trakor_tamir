import React from 'react'
import { useState, useCallback } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'
import BizeKatıl from '../componen/BizeKatıl'
import bag from "../resim/bağ.jpg"
import "../App.css"
import { useAuth } from '../componen/AuthContext'

const Giriş = () => {
    const [email, setEmail] = useState("");
    const [şifre, setŞifre] = useState("");
    const {setEmail: setGlobalEmail } = useAuth();
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!email || !şifre) {
            alert("Lütfen tüm alanları doldurun");
            return;
        }

        signInWithEmailAndPassword(auth, email, şifre)
            .then(() => {
                alert("Giriş yapıldı");
                setGlobalEmail(email);  // Global duruma email'i kaydedin
                setLoggedIn(true);
            })
            .catch((e) => {
                console.error(e);
                alert("Giriş yaparken bir hata oluştu. Lütfen tekrar deneyin.");
            });
    }, [email, şifre, setGlobalEmail]);

    if (loggedIn) {
        return <BizeKatıl />;
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "center",
            backgroundImage: `url(${bag})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "90vh"
        }}>
            <div className="col-md-6">
                <div className="container blur" style={{
                    width: "40rem",
                    height: "20rem",
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: "center",
                    borderRadius: "10px"
                }}>
                    <form onSubmit={handleSubmit} style={{
                        display: "flex",
                        alignItems: 'center',
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "100%"
                    }}>
                        <div className="form-group" style={{ marginRight: "10px", width: "60%" }}>
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.currentTarget.value)} placeholder="Kullanıcı Adı" />
                        </div>

                        <div className="form-group" style={{ marginTop: "10px", width: "60%" }}>
                            <label htmlFor="şifre">Şifre</label>
                            <input type="password" className="form-control" value={şifre} onChange={(e) => setŞifre(e.currentTarget.value)} placeholder="Şifre" />
                        </div>

                        <div style={{
                            display: "grid",
                            gap: "5px",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}>
                            <button className='btn btn-hover' type='submit'>
                                GÖNDER
                            </button>
                            <Link to="/ForgotPassword" style={{ textDecoration: "none" }}>Şifremi Unuttum</Link>
                            <Link to="/Kayıt" style={{ textDecoration: "none" }}>Hesap Oluştur</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Giriş;
