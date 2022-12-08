import { format } from "date-fns";
import React from "react";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import SearchItem from "../../components/hotel/SearchItem";
import Hotel from "../../components/hotel/SearchItem";
import Mail from "../../components/mail/Mail";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import "./hotels.css";

const Hotels = () => {
  const location = useLocation();

  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [destination, setDestination] = useState(location.state.destination);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const { data, loading, error, fetchData } = useFetch(
    `/hotels?city=${destination}&min=${min}&max=${max}`
  );

  const handleSearch = () => {
    fetchData();
  };

  return (
    <>
      <Navbar />
      <Header />
      <div className="hotels">
        <div className="hotelsSearch">
          <h1 style={{ fontSize: "24px" }}>Search</h1>
          <div className="hotelsSearchList">
            <div className="hotelsSeachItem">
              <label className="hotelsSearchLabel">Destination</label>
              <input
                type="text"
                placeholder={destination}
                className="hotelsSearchInput"
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
              />
            </div>
            <div className="hotelsSeachItem">
              <label className="hotelsSearchLabel">Check-in date</label>
              <span
                className="hotelsSearchDate"
                onClick={() => setOpenDate(!openDate)}
              >
                {format(date[0].startDate, "dd-MM-yyyy")} to{" "}
                {format(date[0].endDate, "dd-MM-yyyy")}
              </span>
              {openDate && (
                <DateRange
                  className="hotelsSearchDateOpen"
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                />
              )}
            </div>
            <div className="hotelsSeachItem">
              <label className="hotelsSearchLabel">Options</label>
              <div className="hotelsSearchOptionsList">
                <div className="hotelsSearchOptionsItem">
                  <label className="hotelsSearchOptionsLabel">
                    Min price (per night)
                  </label>
                  <input
                    className="hotelsSearchOptionsInput"
                    type="text"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="hotelsSearchOptionsItem">
                  <label className="hotelsSearchOptionsLabel">
                    Max price (per night)
                  </label>
                  <input
                    className="hotelsSearchOptionsInput"
                    type="text"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div className="hotelsSearchOptionsItem">
                  <label className="hotelsSearchOptionsLabel">Adult</label>
                  <input
                    className="hotelsSearchOptionsInput"
                    type="number"
                    placeholder={location.state.options.adult}
                    min={0}
                  />
                </div>
                <div className="hotelsSearchOptionsItem">
                  <label className="hotelsSearchOptionsLabel">Children</label>
                  <input
                    className="hotelsSearchOptionsInput"
                    type="number"
                    placeholder={location.state.options.children}
                    min={0}
                  />
                </div>
                <div className="hotelsSearchOptionsItem">
                  <label className="hotelsSearchOptionsLabel">Rooms</label>
                  <input
                    className="hotelsSearchOptionsInput"
                    type="number"
                    placeholder={location.state.options.rooms}
                    min={0}
                  />
                </div>
              </div>
            </div>
            <button
              style={{
                border: "none",
                backgroundColor: "#0071c2",
                color: "white",
                cursor: "pointer",
                padding: "10px",
                fontWeight: 500,
              }}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="hotelsList">
          {loading
            ? "Loading..."
            : data.length === 0
            ? "No data found"
            : data.map((hotel) => <SearchItem data={hotel} key={hotel._id} />)}
        </div>
      </div>
      <Mail />
    </>
  );
};

export default Hotels;
