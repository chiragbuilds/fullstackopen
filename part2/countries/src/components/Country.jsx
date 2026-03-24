import React from 'react'

const Country = ({country}) => {
    console.log("Country Component is called");
    
  return (
    <div>
        <h1>{country.name.common}</h1>
        <p><b>Capital: </b> {country.capital}</p>

        <p><b>Area: </b> {country.area}</p>
        <p><b>Population: </b> {country.population}</p>

        <h2>Languages</h2>
        <ul>
            {
                Object.values(country.languages).map(language => <li key={language}>{language}</li>)
            }
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        
    </div>
  )
}

export default Country