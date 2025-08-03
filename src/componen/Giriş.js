import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../componen/AuthContext';
import bag from "../resim/bağ.jpg";
import "../App.css";

const Giriş = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        
        setError(null);

        if (!email || !password) {
            alert("Lütfen tüm alanları doldurun");
            return;
        }

        try {
            await login(email, password);
            
            // Başarılı giriş sonrası bir mesaj gösterip ardından yönlendirme yapabiliriz
            alert("Giriş yapıldı!");
            navigate('/BizeKatıl');

        } catch (e) {
            console.error("Giriş yaparken hata oluştu:", e);
            setError("Giriş yaparken bir hata oluştu. Lütfen e-posta ve şifrenizi kontrol edin.");
        }
    }, [email, password, login, navigate]);

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
                        {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                        
                        <div className="form-group" style={{ marginRight: "10px", width: "60%" }}>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={email} 
                                onChange={(e) => setEmail(e.currentTarget.value)} 
                                placeholder="E-posta Adresi" 
                            />
                        </div>

                        <div className="form-group" style={{ marginTop: "10px", width: "60%" }}>
                            <label htmlFor="password">Şifre</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                value={password} 
                                onChange={(e) => setPassword(e.currentTarget.value)} 
                                placeholder="Şifre" 
                            />
                        </div>

                        <div style={{
                            display: "grid",
                            gap: "5px",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}>
                            <button className='btn btn-hover' type='submit'>
                                GİRİŞ YAP
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
