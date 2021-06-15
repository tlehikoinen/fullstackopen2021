const notificationReducer = (state = {}, action) => {
  switch(action.type) {
  case 'NEW_NOTIFICATION':
    if(state.timeout !== null) {
      clearTimeout(state.timeout)
    }
    return { ...state, message: action.data.notification, type: action.data.type, timeout: action.data.timeout }
  case 'CLEAR_NOTIFICATION':
    return ''
  default:
    return state
  }
}

export const createNotification = (data) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      notification: data.message,
      type: data.type,
      timeout: data.timeout
    }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}


export const setNotification = (message, type, time) => {
  return async dispatch => {
    const timeout = setTimeout(() => {
      dispatch(clearNotification())
    }, (time*1000))
    dispatch(createNotification({ message, type, timeout }))

  }
}

export default notificationReducer