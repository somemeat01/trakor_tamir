import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Doğrudan 'auth' servisini import ediyoruz, 'app' değil.

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kullanıcı durumunu dinlemek için useEffect kullanılır.
  // 'auth' servisini doğrudan kullanıyoruz.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // useEffect temizleme fonksiyonu: Bileşen kaldırıldığında dinleyiciyi kapatır
    return unsubscribe;
  }, []); // Bağımlılık dizisi boş kalabilir çünkü 'auth' objesi değişmez.

  // Giriş yapma fonksiyonu
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Kayıt olma fonksiyonu
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Çıkış yapma fonksiyonu
  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout
  };

  // Yükleme durumu bitene kadar çocuk bileşenleri render etme
  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
