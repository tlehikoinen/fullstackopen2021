
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notificationMessage = useSelector(state => state.notification.message )
  const type = useSelector(state => state.notification.type)

  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="errorNotification">
        {message}
      </div>
    )
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="notification">
        {message}
      </div>
    )
  }

  switch(type){
  case 'error':
    return(
      <ErrorNotification message={notificationMessage} />
    )
  case 'default':
    return(
      <Notification message={notificationMessage} />
    )
  default:
    return(
      <>
      </>
    )
  }



}

export default Notification