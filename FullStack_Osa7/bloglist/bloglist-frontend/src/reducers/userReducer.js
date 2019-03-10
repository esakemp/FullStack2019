import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_USR':
    return action.data
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return action.data
  default: return state
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'INIT_USR',
        data: user
      })
    }

  }
}

export const userLogin = (username, password) => {
  return async dispatch => {
    console.log(username, password)
    try {
      const user = await loginService.login({ username: username.value, password: password.value })

      blogService.setToken(user.token)

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      username.onReset()
      password.onReset()

      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (e) {
      dispatch(setNotification('Wrong username or password', 5))
    }
  }
}

export const userLogout = () => {
  return async dispatch => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

export default userReducer