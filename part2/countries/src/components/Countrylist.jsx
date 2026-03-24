import React from "react";
import Country from "./Country";

const Countrylist = ({ countries, showCountry }) => {
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
                <li key={country.name.common}>
                    {country.name.common}
                    <button onClick={()=>showCountry(country.name.common)}>Show</button>    
                </li>
            ))}
        </div>
        
      )}
    </>
  );
};

export default Countrylist;
