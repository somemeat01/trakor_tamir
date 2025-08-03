import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore'; // useDocument hook'u eklendi
import { doc } from 'firebase/firestore'; // doc fonksiyonu eklendi
import { db } from '../firebase';
import { useAuth } from '../componen/AuthContext';
import { useNavigate } from 'react-router-dom';

const Tamir = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Veriyi doğrudan kullanıcının UID'si ile çekmek için sorgu oluşturuldu
    const userDocRef = currentUser ? doc(db, "posts", currentUser.uid) : null;
    const [userDocSnapshot, isUserPostsLoading] = useDocument(userDocRef);

    // Snapshot'tan kullanıcının verilerini al
    const userPostData = userDocSnapshot?.data();

    if (isUserPostsLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem', color: '#333' }}>
                Veriler yükleniyor...
            </div>
        );
    }
    
    const motorIslemleriExist = userPostData?.motorIslemleri && Array.isArray(userPostData.motorIslemleri) && userPostData.motorIslemleri.length > 0;
    
    if (!currentUser || !motorIslemleriExist) {
        return (
            <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', textAlign: 'center', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
                <h1 style={{ color: '#333' }}>Tamir İşlemleriniz</h1>
                <p style={{ color: '#555', marginTop: '1rem' }}>
                    Henüz kaydedilmiş motor işleminiz bulunmamaktadır.
                </p>
                <button
                    onClick={() => navigate('/BizeKatıl')}
                    style={{
                        marginTop: '2rem',
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Profilime Geri Dön
                </button>
            </div>
        );
    }

    // Doğru tarih formatını kullanarak sırala
    const sortedIslemler = userPostData.motorIslemleri
        .sort((a, b) => new Date(b.tarih) - new Date(a.tarih));

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh', maxWidth: '800px', margin: '2rem auto', borderRadius: '10px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
            <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '2rem' }}>Tamir İşlemleriniz</h1>
            <button
                onClick={() => navigate('/BizeKatıl')}
                style={{
                    marginBottom: '2rem',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                }}
            >
                Profilime Geri Dön
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {sortedIslemler.map((item, index) => (
                    <div key={index} style={{
                        backgroundColor: '#fff',
                        padding: '1.5rem',
                        borderRadius: '10px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                        borderLeft: '4px solid #28a745'
                    }}>
                        <p style={{ fontWeight: 'bold', color: '#555', marginBottom: '0.5rem' }}>İşlem:</p>
                        <p style={{ fontSize: '1.1rem', color: '#333' }}>{item.islem}</p>
                        <small style={{ display: 'block', textAlign: 'right', color: '#888', marginTop: '1rem' }}>
                            Tarih: {new Date(item.tarih).toLocaleString()}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tamir;