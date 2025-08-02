// Kayıt.js (Modern tasarım)
import React, { useState, useCallback } from 'react';
import kayıt from '../resim/kayıt.jpg'; // Resim yolu doğru olmalı
import logo from '../resim/Likya.png'; // Logo yolu doğru olmalı
import { updateProfile } from 'firebase/auth'; // Sadece updateProfile kaldı, createUserWithEmailAndPassword artık useAuth'ta
import { db } from '../firebase'; // Firebase config dosyanızdan import
import { addDoc, collection } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../componen/AuthContext'; // useAuth hook'unu import ettik

// CSS Modülü import edildi
import styles from '../styles/Register.module.css';

// Firestore koleksiyon referansı
const usersCollectionRef = collection(db, "posts");

const Kayıt = () => {
  const navigate = useNavigate();
  const { signup } = useAuth(); // useAuth hook'undan signup fonksiyonunu aldık

  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [il, setİl] = useState("");
  const [ilçe, setİlçe] = useState("");
  const [mahalle, setMahalle] = useState("");
  const [tür, setTür] = useState(""); // Traktör türü gibi bir bilgi
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [şifre, setŞifre] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !şifre || !ad || !soyad || !tel) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      setLoading(false);
      return;
    }

    try {
      // 1. AuthContext'ten gelen signup fonksiyonunu kullanarak kullanıcı oluştur
      const userCredential = await signup(email, şifre);
      const user = userCredential.user;

      // 2. Kullanıcının görünen adını güncelle (bu adım aynı kalıyor)
      await updateProfile(user, { displayName: `${ad} ${soyad}` });

      // 3. Firestore'a ek bilgileri kaydet (bu adım da aynı kalıyor)
      await addDoc(usersCollectionRef, {
        uid: user.uid,
        ad: ad,
        soyad: soyad,
        il: il,
        ilçe: ilçe,
        mahalle: mahalle,
        traktorTuru: tür,
        telefon: tel,
        email: email,
        kayitTarihi: new Date()
      });

      alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
      navigate('/Giriş');
    } catch (firebaseError) {
      console.error("Kayıt Hatası:", firebaseError);
      let errorMessage = "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.";

      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Bu e-posta adresi zaten kullanılıyor.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Geçersiz e-posta adresi.";
          break;
        case 'auth/weak-password':
          errorMessage = "Şifre en az 6 karakter olmalıdır.";
          break;
        case 'auth/operation-not-allowed':
          errorMessage = "E-posta/Şifre ile kayıt devre dışı bırakılmış. Lütfen Firebase konsolunuzu kontrol edin.";
          break;
        default:
          errorMessage = "Beklenmeyen bir hata oluştu: " + firebaseError.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [ad, soyad, il, ilçe, mahalle, tür, tel, email, şifre, navigate, signup]); // signup'ı dependency olarak ekledik

  return (
    <div className={styles.registerContainer} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${kayıt})` }}>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h1 className={styles.formTitle}>Yeni Hesap Oluştur</h1>

          {error && <p style={{ color: '#e74c3c', marginBottom: '1rem', fontWeight: 'bold' }}>{error}</p>}

          <div className={styles.inputGroup}>
            <div className={styles.inputField}>
              <label htmlFor="ad" className={styles.label}>Adınız</label>
              <input type="text" id="ad" className={styles.input} placeholder="Adınız" value={ad} onChange={(e) => setAd(e.target.value)} required />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="soyad" className={styles.label}>Soyadınız</label>
              <input type="text" id="soyad" className={styles.input} placeholder="Soyadınız" value={soyad} onChange={(e) => setSoyad(e.target.value)} required />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputField}>
              <label htmlFor="il" className={styles.label}>İl</label>
              <input type="text" id="il" className={styles.input} placeholder="İl" value={il} onChange={(e) => setİl(e.target.value)} />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="ilce" className={styles.label}>İlçe</label>
              <input type="text" id="ilce" className={styles.input} placeholder="İlçe" value={ilçe} onChange={(e) => setİlçe(e.target.value)} />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="mahalle" className={styles.label}>Mahalle</label>
              <input type="text" id="mahalle" className={styles.input} placeholder="Mahalle" value={mahalle} onChange={(e) => setMahalle(e.target.value)} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputField}>
              <label htmlFor="tür" className={styles.label}>Traktör Türü</label>
              <input type="text" id="tür" className={styles.input} placeholder="Örn: Biçerdöver, Pulluk..." value={tür} onChange={(e) => setTür(e.target.value)} />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="tel" className={styles.label}>Telefon Numarası</label>
              <input type="tel" id="tel" className={styles.input} placeholder="Örn: 5xx xxx xx xx" value={tel} onChange={(e) => setTel(e.target.value)} required />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>E-posta Adresi</label>
            <input type="email" id="email" className={styles.input} placeholder="örnek@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Şifre</label>
            <input type="password" id="password" className={styles.input} placeholder="En az 6 karakter" value={şifre} onChange={(e) => setŞifre(e.target.value)} required />
          </div>

          <div className={styles.checkboxContainer}>
            <input type="checkbox" id="rules" className={styles.checkbox} defaultChecked required />
            <label htmlFor="rules">Site kurallarını kabul ediyorum</label>
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
            </button>
            <Link to="/Giriş" className={styles.loginLink}>Zaten hesabım var</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Kayıt;
