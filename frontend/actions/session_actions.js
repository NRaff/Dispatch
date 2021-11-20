import * as SessionApi from '../utils/session_api'
import { receiveUserErrors } from './error_actions';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUser = (user) => ({
  type: LOGIN_USER,
  user
})

export const logoutUser = () => ({
  type: LOGOUT_USER
})

export const requestLoginUser = user => dispatch => (
  SessionApi.newSession(user)
    .then( user => dispatch(loginUser(user)))
    .fail( err => dispatch(receiveUserErrors(err.responseJSON.errors)))
)

export const requestLogoutUser = () => dispatch => (
  SessionApi.deleteSession()
    .then( () => dispatch(logoutUser()))
    .fail( err => console.log(err.responseJSON)) //does there need to be error handling here?
)