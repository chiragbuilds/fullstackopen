import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);

    persons.find((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook `)
      : (setPersons(persons.concat({ name: newName, number: newNumber })),
        setNewName(""),
        setNewNumber(""));
  };

  return (
    <div>
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
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </div>
  );
};

export default App;
