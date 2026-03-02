import { useState } from "react";
import { Persons } from './components/Persons'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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
    console.log(event.target);

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
