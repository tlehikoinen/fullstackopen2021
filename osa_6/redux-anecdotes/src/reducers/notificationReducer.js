const notificationReducer = (state = 'Hello and welcome', action) => {
    switch(action.type) {
        case 'NEW_NOTIFICATION':
            return action.notification
        case 'CLEAR_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export const createNotification = (notification) => {
    return {
        type: 'NEW_NOTIFICATION',
        notification: notification
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(createNotification(message))
        setTimeout(()=>{
            dispatch(clearNotification())
        }, (time*1000))

    }
}

export default notificationReducer