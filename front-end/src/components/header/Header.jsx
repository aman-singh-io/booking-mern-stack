import React from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Select from "./Select";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const Header = (props) => {
  const navigate = useNavigate();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 0,
    children: 0,
    rooms: 1,
  });

  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [openActions, setOpenActions] = useState(false);

  const { dispatch } = useContext(SearchContext);
  return (
    <div
      className="header"
      style={{ height: props.isHome ? "300px" : "100px" }}
    >
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {props.isHome && (
          <>
            <div className="headerHeading">
              <h1 style={{ fontSize: "42px" }}>Find your next stay</h1>
              <p>Search low prices on hotels, homes and much more...</p>
            </div>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} />
                <input
                  type="text"
                  placeholder="Where are you going ?"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} />
                <span onClick={() => setOpenDate(!openDate)}>
                  {format(date[0].startDate, "dd-MM-yyyy")} to{" "}
                  {format(date[0].endDate, "dd-MM-yyyy")}
                </span>
                {openDate && (
                  <DateRange
                    className="date"
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} />
                <span onClick={() => setOpenActions(!openActions)}>
                  {`${options.adult} adult . ${options.children} children . ${options.rooms} room`}
                </span>
                <FontAwesomeIcon icon={faArrowDown} color="#0071c2" />
                {openActions && (
                  <Select options={options} setOptions={setOptions} />
                )}
              </div>
              <button
                className="headerSearchBtn"
                onClick={() => {
                  dispatch({
                    type: "NEW_SEARCH",
                    payload: { destination, date, options },
                  });
                  navigate("/hotels", {
                    state: { destination, date, options },
                  });
                }}
              >
                Search
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
