import React from 'react'

export const PersonForm = (props) => {
  const { handleSubmit, newName, newNumber, setNewName, setNewNumber } = props

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                name:
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                />
                </div>
                <div>
                number:
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
    </div>
  )
}
