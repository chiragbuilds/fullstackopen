import { useEffect, useState } from 'react'
import axios from 'axios'
import Countrylist from './components/Countrylist'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(()=>{
    axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  const countriesToShow = search.length > 0 
                          ? countries.filter(res => res.name.common.toLowerCase().includes(search.toLowerCase()))
                          : []

  const showCountry = country => setSearch(country)
  
  return (
    <>
      Find countries <input value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <Countrylist countries={countriesToShow} showCountry={showCountry}/>
    </>
  )
}

export default App
