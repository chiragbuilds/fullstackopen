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
      number: newNumber
    }

    const isDuplicated = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())

    if (isDuplicated) {
      const update = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)
      if (update) {
        const oldContact = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
        const url = `http://localhost:3001/persons/${oldContact.id}` 
        phonebook
                .update(url, newContact)
                .then(res => {
                    alert(`updated!`),
                    setPersons(persons.map(person => person.id === oldContact.id ? res : person))
                  }
                )
      }
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

  const handleDelete = (id, name) => {
    const url = `http://localhost:3001/persons/${id}`
    const confirm = window.confirm(`Delete ${name}?`)
    if(confirm){
      phonebook
              .remove(url)
              .then(res => {
                setPersons(persons.filter( person => person.id !== res.id))
                alert(`${name} deleted successfully`)
              })
              .catch(()=>{
                alert(`${name} was already removed from the server` )
              })
    }
  }

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
      <Persons resultList={resultList} handleDelete={handleDelete}/>
    </div>
  );
};

export default App;
