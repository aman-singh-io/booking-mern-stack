import React from "react";
import Featured from "../../components/featured/Featured";
import Header from "../../components/header/Header";
import Mail from "../../components/mail/Mail";
import Navbar from "../../components/navbar/Navbar";
import Property from "../../components/property/Property";
import Rating from "../../components/rating/Rating";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header isHome />
      <div className="homeContainer">
        <h1 className="homeTitle">Homes guests love</h1>
        <Rating />
        <h1 className="homeTitle">Browse by property type</h1>
        <Property />
      </div>
      <Mail />
    </div>
  );
};

export default Home;
