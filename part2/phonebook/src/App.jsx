import { useState, useEffect } from "react";
import { Persons } from './components/Persons'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
        .get("http://localhost:3001/persons")
        .then(response => setPersons(response.data))
  }, [])
  

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [searchPeople, setSearchPeople] = useState("")
  
  const resultList = searchPeople.length > 0 
                      ? persons.filter( person => person.name.toLowerCase().includes(searchPeople.toLowerCase()))
                      : persons

  const handleSearchPeople = (e) => {
    setSearchPeople(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    persons.find((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook `)
      : (setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 })),
        setNewName(""),
        setNewNumber(""));
  };

  return (
    <div>
      
      <h2>Phonebook</h2>
      <Filter value={searchPeople} onChange={handleSearchPeople}/>

      <h3>Add a new</h3>
      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>
      <Persons resultList={resultList}/>
    </div>
  );
};

export default App;
