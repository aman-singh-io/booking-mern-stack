import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo" onClick={() => navigate("/")}>
          Booking.com
        </span>
        <div className="navItems">
          {user ? (
            <>
              <button
                className="navButton"
                style={{ marginRight: 20 }}
                onClick={() => {
                  localStorage.removeItem("user");
                  dispatch({ type: "LOGOUT" });
                }}
              >
                Logout
              </button>
              {user.username}
            </>
          ) : (
            <>
              <button className="navButton">Register</button>
              <button className="navButton" onClick={() => navigate("/login")}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
