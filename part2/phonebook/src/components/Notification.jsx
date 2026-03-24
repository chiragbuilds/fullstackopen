import React from 'react'

const Notification = ({ message, msgType }) => {
  return (
    <div className={msgType}>
        {message}
    </div>
  )
}

export default Notification
