import { logIn } from '../../../Admin/Utils/api'
import { Dispatch } from 'redux'
import { IStore } from '../types'
import { getUserData } from '..//../Utils/helpers'
import { ILogin, ILogout } from './userTypes'
import { IUserActions, USER_ACTIONS } from './userTypes'

// Reducer
const initialState = {
  isLoggedIn: false,
  user: {
    _id: '',
    email: '',
    role: ''
  }
}

const userData = getUserData()

if (userData) {
  initialState.isLoggedIn = true
  initialState.user = userData.user
}

export const userReducer = (state = initialState, action: IUserActions) => {
  switch (action.type) {
    case USER_ACTIONS.LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user
      }
    case USER_ACTIONS.LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        user: { _id: '', email: '', role: '' },
        token: ''
      }
    default:
      return state
  }
}

// Action creators

export const loginUser = (loginCredentials: {
  email: string
  password: string
}) => {
  return (dispatch: Dispatch<ILogin>) => {
    return logIn(loginCredentials)
      .then(({ data }) => {
        dispatch({
          type: USER_ACTIONS.LOGIN_USER,
          user: data.user
        })

        localStorage.setItem(
          'userData',
          JSON.stringify({ user: data.user, token: data.token })
        )

        return Promise.resolve()
      })
      .catch(err => {
        if (err.response) {
    
          const errorStatus = err.response.status
          return Promise.reject(
            errorStatus === 404
              ? err.response.data.message
              : errorStatus === 401
                ? 'Password not match'
                : 'Error on submit'
          )
        } else {
          return Promise.reject('Form error')
        }
      })
  }
}

export const logoutUser = () => (dispatch: Dispatch<ILogout>) => {
  localStorage.removeItem('userData')
  dispatch({
    type: USER_ACTIONS.LOGOUT_USER
  })
}

export const selectIsUserLogged = (state: IStore) => state.user.isLoggedIn
export const selectUserEmail = (state: IStore) => state.user.user.email
