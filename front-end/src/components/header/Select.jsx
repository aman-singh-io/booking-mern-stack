import React from "react";
import "./select.css";

const Select = (props) => {
  const { adult, children, rooms } = props.options;
  const { setOptions, options } = props;

  function handleOptions(name, operation) {
    console.log("enter", name, operation);
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "d" ? options[name] - 1 : options[name] + 1,
      };
    });
  }
  return (
    <div className="select">
      <div className="selectItem">
        <span>Adult</span>
        <div className="selectActions">
          <button
            className="selectButton"
            onClick={() => handleOptions("adult", "d")}
            disabled={adult <= 0}
          >
            -
          </button>
          <span>{adult}</span>
          <button
            className="selectButton"
            onClick={() => handleOptions("adult", "i")}
          >
            +
          </button>
        </div>
      </div>
      <div className="selectItem">
        <span>Children</span>
        <div className="selectActions">
          <button
            className="selectButton"
            onClick={() => handleOptions("children", "d")}
            disabled={children <= 0}
          >
            -
          </button>
          <span>{children}</span>
          <button
            className="selectButton"
            onClick={() => handleOptions("children", "i")}
          >
            +
          </button>
        </div>
      </div>
      <div className="selectItem">
        <span>Rooms</span>
        <div className="selectActions">
          <button
            className="selectButton"
            onClick={() => handleOptions("rooms", "d")}
            disabled={rooms <= 1}
          >
            -
          </button>
          <span>{rooms}</span>
          <button
            className="selectButton"
            onClick={() => handleOptions("rooms", "i")}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Select;
