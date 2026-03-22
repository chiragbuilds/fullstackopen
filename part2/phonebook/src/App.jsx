import { useState, useEffect } from "react";
import { Persons } from './components/Persons'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import phonebook from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    phonebook
            .getAll()
            .then(initialContacts => setPersons(initialContacts))
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

    const newContact = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const isDuplicated = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())

    if (isDuplicated) {
      alert(`${newName} is already added to phonebook `)
    }
    else{
      phonebook
              .create(newContact)
              .then(res => {
                setPersons(persons.concat(res))
                setNewName('')
                setNewNumber('')
              })
    }

    
        
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
