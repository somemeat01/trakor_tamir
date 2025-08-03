import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tractor, Wrench } from 'lucide-react';
import arkaPlan from "../resim/ko.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    // Arka plan resmi ve gradyan efektini sayfanın tamamına uyguluyoruz
    <div 
      className="min-h-screen font-sans flex flex-col"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${arkaPlan})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // Sayfa kaydığında arka planı sabit tutar
      }}
    >
      
      {/* Hero Section */}
      <section 
        className="h-[90vh] flex items-center justify-center text-center p-4 relative"
      >
        <div className="relative z-10 text-white max-w-3xl">
          <div className="flex items-center justify-center mb-6">
            <Tractor size={64} className="text-yellow-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Deutz Tamir ve Bakım Servisi
            </h1>
          </div>
          <p className="text-lg md:text-xl font-light mt-4 mb-8">
            Traktörünüzü uzman ellere bırakın. Yüksek performans, güvenli ve uzun ömürlü çözümlerle yanınızdayız.
          </p>
        </div>
      </section>

      {/* Services Callout Section */}
      <section className="bg-white bg-opacity-90 py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Uzman Hizmetler</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-10">
            Deutz traktörleriniz için motor tamiri, periyodik bakım ve arıza tespiti gibi profesyonel hizmetler sunuyoruz.
          </p>
          <button
            onClick={() => {
              navigate('/Giriş');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
          >
            <Wrench size={20} className="mr-2" />
            Hizmetlerimiz Hakkında Daha Fazla Bilgi
          </button>
        </div>
      </section>

      {/* Footer is part of the parent component, but included for context */}
    </div>
  );
};

export default Home;
