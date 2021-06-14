import userService from '../services/users'

const userAndBlogs = (state = { data: [] }, action) => {
  switch (action.type) {
  case 'SETALL': {
    state.data = action.data
    return state
  }
  case 'PRINTALL': {
    console.log(state.data)
    return state
  }
  default:
    return state
  }

}

export const getUsersAndBlogs = () => {
  return async dispatch => {
    const usersAndBlogs = await userService.getAll()
    dispatch(setUsersAndBlogs(usersAndBlogs))
  }
}

export const setUsersAndBlogs = (usersAndBlogs) => {
  return {
    type: 'SETALL',
    data: usersAndBlogs
  }
}

export const printUsersAndBlogs = () => {
  return {
    type: 'PRINTALL'
  }
}





export default userAndBlogs