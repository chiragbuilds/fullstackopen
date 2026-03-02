import React from 'react'

export const Filter = (props) => {
  return (
    <div>
        filter shown with <input type="text" value={props.searchPeople} onChange={props.onChange}/>
    </div>
  )
}
