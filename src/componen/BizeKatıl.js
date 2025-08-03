import React, { useEffect, useState, useCallback } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase";
import { doc, updateDoc, getDoc } from 'firebase/firestore'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../componen/AuthContext';

const BizeKatıl = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [loadingProfileImage, setLoadingProfileImage] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState(null);
  
  const [yeniIslemText, setYeniIslemText] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) {
        setLoadingProfileImage(false);
        return;
      }

      setLoadingProfileImage(true);
      setError(null);
      
      try {
        const userDocRef = doc(db, "posts", currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const userDataFromDB = docSnap.data();
          setUserData(userDataFromDB);
          
          const userPhotoPath = `photos/${currentUser.uid}/traktor_fotografi.jpg`;
          const userPhotoRef = ref(storage, userPhotoPath);
          try {
            const url = await getDownloadURL(userPhotoRef);
            setProfileImageUrl(url);
          } catch (e) {
            setProfileImageUrl(null);
          }
        } else {
          setUserData(null);
        }
      } catch (e) {
        console.error("Kullanıcı verisi çekilirken hata oluştu:", e);
        setError("Profil verileri yüklenirken bir hata oluştu.");
      } finally {
        setLoadingProfileImage(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !currentUser) {
      setError("Lütfen bir dosya seçin veya oturum açtığınızdan emin olun.");
      return;
    }
    setUploadingImage(true);
    setError(null);
    const imagePath = `photos/${currentUser.uid}/traktor_fotografi.jpg`;
    const imageRef = ref(storage, imagePath);
    try {
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setProfileImageUrl(url);
      alert("Traktör fotoğrafı başarıyla yüklendi!");
    } catch (e) {
      console.error("Resim yüklenirken hata oluştu:", e);
      setError("Resim yüklenirken bir hata oluştu: " + e.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveMotorIslemleri = useCallback(async () => {
    if (!currentUser || !userData || !yeniIslemText.trim()) {
      setError("Lütfen bir motor işlemi yazın ve oturum açtığınızdan emin olun.");
      return;
    }
    try {
      const userDocRef = doc(db, "posts", currentUser.uid);
      
      const docSnap = await getDoc(userDocRef);
      const mevcutIslemler = docSnap.exists() && Array.isArray(docSnap.data().motorIslemleri)
        ? docSnap.data().motorIslemleri
        : [];
      
      const yeniIslemObjesi = {
        islem: yeniIslemText,
        tarih: new Date().toISOString()
      };

      const yeniIslemlerListesi = [...mevcutIslemler, yeniIslemObjesi];

      await updateDoc(userDocRef, {
        motorIslemleri: yeniIslemlerListesi
      });
      
      setYeniIslemText(""); 
      alert("Motor işlemi başarıyla kaydedildi!");

    } catch (e) {
      console.error("Motor işlemleri kaydedilirken hata oluştu:", e);
      setError("Motor işlemleri kaydedilirken bir hata oluştu: " + e.message);
    }
  }, [currentUser, userData, yeniIslemText]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Çıkış yaparken hata oluştu:", error.message);
      setError("Çıkış yaparken bir hata oluştu: " + error.message);
    }
  };

  if (loadingProfileImage || !currentUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '1.5rem', color: '#333' }}>
        Yükleniyor...
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontSize: '1.2rem', color: '#555' }}>
        <p>{error || "Profil bilgileriniz bulunamadı. Lütfen önce kayıt olduğunuzdan emin olun."}</p>
        <Link to="/Kayıt" style={{ color: '#007bff', textDecoration: 'none' }}>Kayıt Ol</Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', backgroundColor: '#f5f5f5', maxWidth: '900px', margin: '2rem auto', borderRadius: '10px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>Profilim</h1>
      {error && <p style={{ color: '#e74c3c', textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '0 0 auto', width: '250px', minHeight: '250px', border: '1px solid #ddd', borderRadius: '10px', padding: '1rem', backgroundColor: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <h3 style={{ color: '#555', marginBottom: '0.5rem' }}>Traktör Fotoğrafı</h3>
          {profileImageUrl ? (
            <img src={profileImageUrl} alt="Traktör Fotoğrafı" style={{ width: "200px", height: "200px", objectFit: 'cover', borderRadius: "5%" }} />
          ) : (
            <div style={{ width: "200px", height: "200px", border: '2px dashed #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#888', borderRadius: "5%" }}>
              Fotoğraf Yok
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} style={{ marginTop: '1rem' }} />
          {uploadingImage && <p style={{ color: '#28a745' }}>Yükleniyor...</p>}
        </div>
        <div style={{ flex: '1 1 300px', border: '1px solid #ddd', borderRadius: '10px', padding: '1.5rem', backgroundColor: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#555', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Kişisel Bilgiler</h3>
          <p><strong>Ad:</strong> {userData.ad}</p>
          <p><strong>Soyad:</strong> {userData.soyad}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Telefon:</strong> {userData.telefon}</p>
          <p><strong>İl:</strong> {userData.il || '-'}</p>
          <p><strong>İlçe:</strong> {userData.ilçe || '-'}</p>
          <p><strong>Mahalle:</strong> {userData.mahalle || '-'}</p>
          <p><strong>Traktör Türü:</strong> {userData.traktorTuru || '-'}</p>
        </div>
        <div style={{ flex: '1 1 100%', border: '1px solid #ddd', borderRadius: '10px', padding: '1.5rem', backgroundColor: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginTop: '2rem' }}>
          <h3 style={{ color: '#555', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Motor İşlemi Ekle</h3>
          <textarea
            placeholder="Motorunuza yapılan yeni işlemi buraya yazın..."
            value={yeniIslemText}
            onChange={(e) => setYeniIslemText(e.target.value)}
            style={{ width: '100%', minHeight: '150px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', resize: 'vertical', fontSize: '1rem' }}
          ></textarea>
          <button onClick={handleSaveMotorIslemleri} style={{ marginTop: '1rem', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            İşlemi Kaydet
          </button>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button
          onClick={() => navigate('/Tamir')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          Tüm İşlemleri Görüntüle
        </button>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default BizeKatıl;