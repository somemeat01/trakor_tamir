import React, { Component } from "react";
import oktay from "../resim/oktay.jpg";
import necati from "../resim/necati.jpg";
import osman from "../resim/osman.jpg";
// style={{ backgroundColor:'black'}}
export default class Hakkında extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "rgba(222,222,222,.5)",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap:"20px",
          height: "90vh",
          width: "100%",
          paddingLeft: "10rem",
          paddingRight: "10rem",
        }}
      >
        <div
          style={{
            width: "30%",
            height: "50%",
            borderRadius: "1rem",
            backgroundColor: "black",
            justifyContent: "center",
            alignItems:"center",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxShadow: "0 10px 10px rgba(0,0,0,.5)",
            color:"white",
            padding:"1rem",
            textAlign:"center"
          }}
        >
          <img
            src={oktay}
            style={{
              width: "9rem",
              height: "9rem",
              borderRadius: "50%",
              position: "absolute",
              top: "-4rem",
              left: "5.75rem",
            }}
          />
          <div style={{
            display:"flex",
            flexDirection:"column",
            
            
          }}>
            <h1 style={{fontSize:"1.5rem", color:"white"}}>Oktay ALAT</h1>
           <p>
            Oktay Bey tarım ürünleri imalatı ve ithalatı yapmaktadır
           </p>
            <div style={{
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",
              width:"100%",
              height:"5rem",
              backgroundColor:"black",
              color:"white",
              alignItems:"center",
              fontSize:"1rem",
            }}>

             <div styşe={{width:"50%",
              borderWidth:"1px"}}>0556 218 7438</div>
            <button>Tıkla</button>
            </div>
            
            <div className="social-media"  style={{
              display:"flex",
              flexDirection:"column",
              justifyContent:"center"}}>
              <div className="facebook" >
                <a href="#" ><i className="fa-brands fa-facebook"></i></a>
              </div>
              <div className="instagram" >
                <a href="https://instagram.com/some_meat1" target="_blank" ><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>
            
            
            </div>
          </div>
        <div
          style={{
            width: "30%",
            height: "50%",
            borderRadius: "1rem",
            backgroundColor: "black",
            justifyContent: "center",
            alignItems:"center",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxShadow: "0 10px 10px rgba(0,0,0,.5)",
            color:"white",
            padding:"1rem",
            textAlign:"center"
          }}
        >
          <img
            src={necati}
            style={{
              width: "9rem",
              height: "9rem",
              borderRadius: "50%",
              position: "absolute",
              top: "-4rem",
              left: "5.75rem",
            }}
          />
          <div style={{
            display:"flex",
            flexDirection:"column",
            
            
          }}>
            <h1 style={{fontSize:"1.5rem", color:"white"}}>necati can alat</h1>
           <p>
            Oktay Bey tarım ürünleri imalatı ve ithalatı yapmaktadır
           </p>
            <div style={{
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",
              width:"100%",
              height:"5rem",
              backgroundColor:"black",
              color:"white",
              alignItems:"center",
              fontSize:"1rem",
            }}>
              <div style={{width:"50%",borderWidth:"1px"}}>0556 218 7438</div>
            <button>Tıkla</button>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "30%",
            height: "50%",
            borderRadius: "1rem",
            backgroundColor: "black",
            justifyContent: "center",
            alignItems:"center",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxShadow: "0 10px 10px rgba(0,0,0,.5)",
            color:"white",
            padding:"1rem",
            textAlign:"center"
          }}
        >
          <img
            src={osman}
            style={{
              width: "9rem",
              height: "9rem",
              borderRadius: "50%",
              position: "absolute",
              top: "-4rem",
              left: "5.75rem",
            }}
          />
          <div style={{
            display:"flex",
            flexDirection:"column",
            
            
          }}>
            <h1 style={{fontSize:"1.5rem", color:"white"}}>Oktay ALAT</h1>
           <p>
            Oktay Bey tarım ürünleri imalatı ve ithalatı yapmaktadır
           </p>
            <div style={{
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",
              width:"100%",
              height:"5rem",
              backgroundColor:"black",
              color:"white",
              alignItems:"center",
              fontSize:"1rem",
            }}>
              <div style={{width:"50%",borderWidth:"1px"}}>0556 218 7438</div>
            <button>Tıkla</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
