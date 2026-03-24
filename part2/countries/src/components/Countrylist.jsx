import React from "react";
import Country from "./Country";

const Countrylist = ({ countries }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return (
    <>
      {
        countries.length > 10 ? (
        <p>Too many countries, specify another filter</p>
      ) : (
        <div>
            {countries.map((country) => (
                <p key={country.name.common}>{country.name.common}</p>
            ))}
        </div>
        
      )}
    </>
  );
};

export default Countrylist;
