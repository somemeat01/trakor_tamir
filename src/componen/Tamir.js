import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../componen/AuthContext';
import { useNavigate } from 'react-router-dom';

const Tamir = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Sadece oturum açmış kullanıcıya ait postları filtrelemek için sorgu oluştur
    const userPostsQuery = currentUser ? query(collection(db, "posts"), where("email", "==", currentUser.email)) : null;

    const [userPostsSnapshot, isUserPostsLoading] = useCollection(userPostsQuery);

    // Snapshot'tan kullanıcının verilerini al
    const userPostData = userPostsSnapshot && userPostsSnapshot.docs[0] ? userPostsSnapshot.docs[0].data() : null;

    if (isUserPostsLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem', color: '#333' }}>
                Veriler yükleniyor...
            </div>
        );
    }
    
    // Eğer kullanıcı oturum açmamışsa veya motorIslemleri verisi dizi değilse/boşsa
    const motorIslemleriExist = userPostData && userPostData.motorIslemleri && Array.isArray(userPostData.motorIslemleri) && userPostData.motorIslemleri.length > 0;
    
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

    // Hata düzeltme: Sadece doğru veri yapısına sahip elemanları filtreleyip sırala
    const sortedIslemler = userPostData.motorIslemleri
        .filter(item => item && item.tarih && item.tarih.seconds !== undefined)
        .sort((a, b) => b.tarih.seconds - a.tarih.seconds);

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
                            Tarih: {new Date(item.tarih.seconds * 1000).toLocaleString()}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tamir;
