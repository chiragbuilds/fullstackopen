import React from 'react'

export function Persons({resultList, handleDelete}) {
  return (
    <div >
        {
            resultList.map( (person) => 
              <li key={person.name}>
                {person.name} {person.number} 
                <button onClick={()=> handleDelete(person.id, person.name)}>delete</button>
              </li>
            )
        }
    </div>
  )
}
