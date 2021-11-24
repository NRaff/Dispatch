import * as MessageApi from '../utils/message_api'
import { receiveMessageErrors, removeMessageErrors } from './error_actions';

export const RECEIVE_ALL_MESSAGES = 'RECEIVE_ALL_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export const receiveAllMessages = messages => ({
  type: RECEIVE_ALL_MESSAGES,
  messages
})

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
})

export const removeMessage = messageId => ({
  type: REMOVE_MESSAGE,
  messageId
})

export const clearMessages = () => ({
  type: CLEAR_MESSAGES
})

export const createMessage = message => dispatch => (
  MessageApi.createMessage(message)
    .then( message => {
      dispatch(receiveMessage(message))
      dispatch(removeMessageErrors())
    })
    .fail( err => dispatch(receiveMessageErrors(err.responseJSON.errors)))
)

export const updateMessage = message => dispatch => (
  MessageApi.updateMessage(message)
    .then( message => dispatch(receiveMessage(message)))
    .fail( err => dispatch(receiveMessageErrors(err.responseJSON.errors)))
)

export const deleteMessage = messageId => dispatch => (
  MessageApi.deleteMessage(messageId)
    .then( () => dispatch(removeMessage(messageId)))
    .fail( err => dispatch(receiveMessageErrors(err.responseJSON.errors)))
)
