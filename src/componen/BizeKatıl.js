import React, { useEffect, useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage, db } from "../firebase"
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore'
import { Link } from 'react-router-dom';
import { useAuth } from '../componen/AuthContext';

const imageRef= ref(storage, "photos/image-name");
const imageRef1= ref(storage, "photos/image-name1");
const bilgi = collection(db, "posts");

const BizeKatıl = () => {
  const { email } = useAuth();
  const [data, isLoading] = useCollectionData(bilgi);
  const [url, setUrl] = useState(null);
  const [url1, setUrl1] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState(null);
  
  const foto=()=>{filteredData.map((bulundu, index) =>       
    {setName(bulundu.ad)}   
  )}
  
  const imageRef= ref(storage, `photos/image-${name}`);
  // Resmin URL'sini almak için

  useEffect(() => {
    getDownloadURL(imageRef).then((url) => {
      setUrl(url);
    }).catch((e) => {
      console.log(e);
    });
  }, []);

  useEffect(() => {
    getDownloadURL(imageRef1).then((url) => {
      setUrl1(url);
    }).catch((e) => {
      console.log(e);
    });
  }, []);

  // Filtreleme işlemini yapmak için
  useEffect(() => {
    if (data) {
      const filtered = data.filter((bulundu) => bulundu.email === email);
      setFilteredData(filtered);
    }
  }, [data, email]);

  


  if (isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",}}>
      <div style={{
        display: "flex",
        border: "solid",
        marginTop: "2rem",
        marginLeft: "2rem",
        flexDirection: "column",
        padding: "1.3rem"
      }}>
        {url && <img src={url} alt="" style={{ width: "10rem", height: "10rem", borderRadius: "50%" }} />}
        <input type="file" accept="image/*" onChange={(e) => {
          const file = e.currentTarget.files[0];
          foto();
          uploadBytes(imageRef, file).then(() => {
            // Resim yüklendikten sonra yapılacak işlemler
          });
        }} />

      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "2rem",
        marginLeft: "2rem",
        border: "solid",
        marginRight: "78%",
        padding: "1.3rem"
      }}>
      {url1 && <img src={url1} alt="" style={{ width: "10rem", height: "10rem", borderRadius: "50%" }} />}
        <input type="file" accept="image/*" onChange={(e) => {
          const file1 = e.currentTarget.files[0];
          uploadBytes(imageRef1, file1).then(() => {
            // Resim yüklendikten sonra yapılacak işlemler
          });
        }} />
      </div>
      </div>

  

     
      <Link to="/">çıkış</Link>
    </div>
  );
}

export default BizeKatıl;
