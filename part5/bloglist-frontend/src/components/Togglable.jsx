import React, { useState, useImperativeHandle } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none'}
  const hideWhenVisible = { display: visible ? 'none' : ''}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div >
        <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>
        <div style={showWhenVisible}>
            {props.children}
            <button onClick={toggleVisibility}>cancel</button>
        </div>
    </div>
  )
}

export default Togglable