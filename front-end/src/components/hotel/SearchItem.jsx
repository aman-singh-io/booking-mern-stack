import React from "react";
import { useNavigate } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ data }) => {
  const { name, distance, description, cheapestPrice, city, _id } = data;
  const navigate = useNavigate();
  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="sImg"
      />
      <div className="sDescription">
        <h1 className="sDTitle">{name}</h1>
        <span className="sDDistance">{distance}m from center</span>
        <span className="sDTaxiOp">Free airport taxi</span>
        <span className="sDSubtitle">{city}</span>
        <span className="sDFeatures">{description}</span>
        <span className="sDCancelOp">Free cancellation </span>
        <span className="sDCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="sPrice">
        <div className="sPRating">
          <span style={{ fontWeight: 600 }}>Excellent</span>
          <span
            style={{
              color: "white",
              backgroundColor: "#003580",
              padding: "5px",
            }}
          >
            8.9
          </span>
        </div>
        <div className="sPPrice">
          <span className="sPAmount">${cheapestPrice}</span>
          <span className="sPTaxes">Includes taxes and fees</span>
          <button
            className="sPButton"
            onClick={() => navigate(`/hotel/${_id}`)}
          >
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
