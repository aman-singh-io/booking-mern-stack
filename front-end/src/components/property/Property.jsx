import React from "react";
import useFetch from "../../hooks/useFetch";
import "./property.css";

const Property = () => {
  const { data, loading, error } = useFetch("/hotels/countByType");
  console.log(data);
  return (
    <div className="property">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data.map((type) => {
            return (
              <div className="propertyItem">
                <img src={type.img} alt="" className="propertyImg" />
                <h1 className="propertyTitle">{type.type}</h1>
                <h2 className="propertySubTitle">{`${
                  type.count
                } ${type.type.toLowerCase()}`}</h2>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Property;
