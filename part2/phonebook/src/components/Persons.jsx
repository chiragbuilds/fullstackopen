import React from 'react'

export function Persons({resultList}) {
  return (
    <div >
        {
            resultList.map( person => <li key={person.name}> {person.name} {person.number}</li>)
        }
    </div>
  )
}
