
const userReducer = ( state = { user: { }, loggedIn:false } , action ) => {
  switch (action.type) {
  case 'CLEAR':
    state.user = {}
    state.loggedIn = false
    return state
  case 'SETUSER':
    state.user.name = action.user.name
    state.user.token = action.user.token
    state.user.username = action.user.username
    state.loggedIn = true
    return state
  case 'PRINTUSER':
    return state

  default:
    return state
  }
}


export const setUserInfo = (user) => {
  return {
    type: 'SETUSER',
    user: {
      name : user.name,
      token : user.token,
      username : user.username
    }
  }
}

export const clearUserInfo = () => {
  return {
    type: 'CLEAR'
  }
}

export const printUserInfo = () => {
  return {
    type: 'PRINTUSER'
  }
}

export default userReducer

