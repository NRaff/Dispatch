import * as UserApi from '../utils/user_api'
import { receiveUserErrors } from './error_actions';
import { loginUser } from './session_actions';

export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const receiveAllUsers = users => ({
  type: RECEIVE_ALL_USERS,
  users
})

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

export const removeUser = userId => ({
  type: REMOVE_USER,
  userId
})

export const fetchUsers = () => dispatch => (
  UserApi.fetchUsers()
    .then( users => dispatch(receiveAllUsers(users)))
    .fail( err => dispatch(receiveUserErrors(err)))
)

export const fetchUser = userId => dispatch => (
  UserApi.fetchUser(userId)
    .then( user => dispatch(receiveUser(user)))
    .fail(err => dispatch(receiveUserErrors(err)))
)

export const createUser = user => dispatch => (
  UserApi.createUser(user)
    .then( user => {
      dispatch(receiveUser(user))
      dispatch(loginUser(user))
    })
    .fail(err => dispatch(receiveUserErrors(err)))
)

export const deleteUser = userId => dispatch => (
  UserApi.deleteUser(userId)
    .then( () => console.log('User deleted'))
    .fail(err => dispatch(receiveUserErrors(err)))
)

export const updateUser = user => dispatch => (
  UserApi.updateUser(user)
    .then( user => dispatch(receiveUser(user)))
    .fail(err => dispatch(receiveUserErrors(err)))
)