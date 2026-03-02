import { useState } from "react";

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
      filter shown with <input type="text" value={searchPeople} onChange={e => setSearchPeople(e.target.value)}/>

      <h2>Add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {
        resultList.map(p => <li key={p.name}> {p.name} {p.number} </li>)
      }
    </div>
  );
};

export default App;
