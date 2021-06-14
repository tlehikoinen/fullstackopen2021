import { createStore, combineReducers, applyMiddleware }  from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersAndBlogs from './reducers/usersAndBlogsReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs : blogReducer,
  user : userReducer,
  usersAndBlogs : usersAndBlogs
})

const store = createStore(
  reducer, composeWithDevTools(applyMiddleware(thunk))
)

export default store