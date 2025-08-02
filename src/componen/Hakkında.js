import React from "react";
import oktay from "../resim/oktay.jpg";
import necati from "../resim/necati.jpg";
import osman from "../resim/osman.jpg";
import arkaPlan from "../resim/kp.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const profiles = [
  {
    name: "Oktay ALAT",
    img: oktay,
    description: "Oktay Bey tarım ürünleri imalatı ve ithalatı yapmaktadır",
    phone: "0556 218 7438",
    instagram: "https://instagram.com/some_meat1",
    facebook: "#",
  },
  {
    name: "Necati Can ALAT",
    img: necati,
    description: "Oktay Bey tarım ürünleri imalatı ve ithalatı yapmaktadır",
    phone: "0556 218 7438",
    instagram: "https://instagram.com/some_meat1",
    facebook: "#",
  },
  {
    name: "Oktay ALAT",
    img: osman,
    description: "Oktay Bey tarım ürünleri imalatı ve ithalatı yapmaktadır",
    phone: "0556 218 7438",
    instagram: "https://instagram.com/some_meat1",
    facebook: "#",
  },
];

const Hakkında = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${arkaPlan})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "4rem 2rem",
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "80%" }}>
        <Slider {...settings}>
          {profiles.map((person, index) => (
            <div key={index}>
              <div
                style={{
                  maxWidth: "650px",
                  width: "90%",
                  margin: "0 auto",
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "1rem",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                  padding: "2rem",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <img
                  src={person.img}
                  alt={person.name}
                  style={{
                    width: "9rem",
                    height: "9rem",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid white",
                    marginBottom: "1rem",
                  }}
                />
                <h2>{person.name}</h2>
                <p style={{ margin: "1rem 0" }}>{person.description}</p>
                <p>{person.phone}</p>
                <button
                  style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1.5rem",
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Tıkla
                </button>
                <div style={{ marginTop: "1rem", fontSize: "1.5rem" }}>
                  <a href={person.facebook} target="_blank" rel="noreferrer" style={{ marginRight: "1rem", color: "#1877F2" }}>
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a href={person.instagram} target="_blank" rel="noreferrer" style={{ color: "#E4405F" }}>
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hakkında;
