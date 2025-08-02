import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../componen/AuthContext';
import bag from "../resim/bağ.jpg";
import "../App.css";

const Giriş = () => {
    // navigate hook'u ile yönlendirme yapacağız
    const navigate = useNavigate();

    // useAuth hook'undan login fonksiyonunu alıyoruz.
    // Artık global email state'i yönetmeye gerek yok, çünkü AuthContext Firebase'den gelen kullanıcıyı otomatik olarak dinleyecek.
    const { login } = useAuth();

    // Lokal state'lerimizi koruyoruz
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // Şifre için ş harfi olmadan 'password' kullanmak daha yaygındır
    
    // Hata mesajı için bir state ekleyebiliriz
    const [error, setError] = useState(null);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        
        setError(null); // Önceki hataları temizle

        if (!email || !password) {
            alert("Lütfen tüm alanları doldurun");
            return;
        }

        try {
            // useAuth'tan gelen login fonksiyonunu çağırıyoruz
            await login(email, password);
            
            // Giriş başarılı olursa, /BizeKatıl sayfasına yönlendiriyoruz
            // AuthContext.js artık currentUser'ı otomatik olarak güncellediği için BizeKatıl sayfası sorunsuz çalışacak.
            navigate('/BizeKatıl');
            
            // Başarılı mesajı artık gerekmiyor, çünkü sayfa zaten yönlenecek
            // alert("Giriş yapıldı");

        } catch (e) {
            console.error("Giriş yaparken hata oluştu:", e);
            setError("Giriş yaparken bir hata oluştu. Lütfen e-posta ve şifrenizi kontrol edin.");
        }
    }, [email, password, login, navigate]);

    // Artık `loggedIn` state'ine veya `<BizeKatıl />` bileşenini doğrudan render etmeye gerek yok.
    // Yönlendirme işlemi React Router tarafından halledilecek.
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
