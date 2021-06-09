const notificationReducer = (state = {message: 'Hello and welcome', timeout : null}, action) => {
    switch(action.type) {
        case 'NEW_NOTIFICATION':
            if(state.timeout !== null) {
                clearTimeout(state.timeout)
            }
            return {...state, message: action.data.notification, timeout: action.data.timeout}
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
            timeout: data.timeout
        }
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export const setNotification = (message, time) => {
    return async dispatch => {
        const timeout = setTimeout(()=>{
            dispatch(clearNotification())
        }, (time*1000))
        dispatch(createNotification({message, timeout}))

    }
}

export default notificationReducer