import React from "react";
import "./mail.css";

const Mail = () => {
  return (
    <div className="mail">
      <h1>Save time, save money!</h1>
      <span>Sign up and we'll send the best deals to you</span>
      <div className="mailActions">
        <input type="text" className="mailInput" placeholder="Your email" />
        <button className="mailButton">Subscribe</button>
      </div>
    </div>
  );
};

export default Mail;
