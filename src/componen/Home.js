import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../componen/AuthContext';
import { Link } from 'react-router-dom';
import bag from '../resim/bağ.jpg'; // Resim yolunu kullanıyoruz
import "../App.css";

// Firestore'daki 'posts' koleksiyonuna referans
const postsCollectionRef = collection(db, "posts");

const Home = () => {
    // AuthContext'ten oturum açmış kullanıcıyı al
    const { currentUser } = useAuth();
    
    // Sadece oturum açmış kullanıcıya ait postları filtrelemek için sorgu oluştur
    // Bu sorgu, kullanıcının email'ine göre filtreleme yapar.
    // En iyi uygulama için uid kullanmak daha güvenlidir. (request.auth.uid == resource.data.uid)
    const userPostsQuery = currentUser ? query(postsCollectionRef, where("email", "==", currentUser.email)) : null;

    const [userPostsSnapshot, isUserPostsLoading] = useCollection(userPostsQuery);

    const userPostData = userPostsSnapshot ? userPostsSnapshot.docs[0] : null;

    // Yükleme durumu
    if (isUserPostsLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem', color: '#333' }}>
                Veriler yükleniyor...
            </div>
        );
    }
    
    // Eğer kullanıcı oturum açmamışsa bir mesaj göster
    if (!currentUser) {
      return (
        <div style={{
            backgroundImage: `url(${bag})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '1rem',
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            fontSize: '1.2rem',
            textAlign: 'center'
        }}>
            <p>Bu sayfayı görebilmek için lütfen giriş yapın veya kayıt olun.</p>
            <Link to="/Giriş" className="btn btn-hover">Giriş Yap</Link>
        </div>
      );
    }

    // Eğer kullanıcının motor işlemi yoksa bir mesaj göster
    if (!userPostData || !userPostData.data().motorIslemleri) {
      return (
          <div style={{
              backgroundImage: `url(${bag})`,
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontSize: '1.2rem',
              textAlign: 'center'
          }}>
              <p>Henüz motor işlemi paylaşmamışsınız. Profil sayfanızdan ekleme yapabilirsiniz.</p>
              <Link to="/BizeKatıl" className="btn btn-hover">Profilime Git</Link>
          </div>
      );
    }

    const post = userPostData.data();

    return (
        <div style={{
            backgroundImage: `url(${bag})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '2rem'
        }}>
            <h1 style={{
                textAlign: 'center',
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                marginBottom: '2rem',
                fontSize: '2.5rem'
            }}>
                Hoş Geldiniz, {post.ad}!
            </h1>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                maxWidth: '600px',
                margin: 'auto'
            }}>
                <div style={{
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    padding: '1.5rem',
                    borderRadius: '10px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    width: '100%',
                    borderLeft: '5px solid #28a745'
                }}>
                    <h3 style={{ color: '#007bff', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>
                        Motor İşlemleriniz
                    </h3>
                    <div style={{
                        backgroundColor: '#f9f9f9',
                        padding: '1rem',
                        borderRadius: '5px',
                        border: '1px solid #eee',
                        marginTop: '1rem'
                    }}>
                        <p>{post.motorIslemleri}</p>
                    </div>
                    <small style={{ color: '#555', marginTop: '1rem', display: 'block', textAlign: 'right' }}>
                        Son Güncelleme: {post.sonGuncellemeTarihi ? new Date(post.sonGuncellemeTarihi.seconds * 1000).toLocaleString() : '-'}
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Home;
