export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const REMOVE_USER_ERRORS = 'REMOVE_USER_ERRORS';
export const RECEIVE_THREAD_ERRORS = 'RECEIVE_THREAD_ERRORS'
export const REMOVE_THREAD_ERRORS = 'REMOVE_THREAD_ERRORS'
export const RECEIVE_MESSAGE_ERRORS = 'RECEIVE_MESSAGE_ERRORS';
export const REMOVE_MESSAGE_ERRORS = 'REMOVE_MESSAGE_ERRORS'


export const receiveUserErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
})

export const receiveMessageErrors = errors => ({
  type: RECEIVE_MESSAGE_ERRORS,
  errors
})

export const receiveThreadErrors = errors => ({
  type: RECEIVE_THREAD_ERRORS,
  errors
})

export const removeUserErrors = () =>({
  type: REMOVE_USER_ERRORS
})

export const removeThreadErrors = () =>({
  type: REMOVE_THREAD_ERRORS
})

export const removeMessageErrors = () => ({
  type: REMOVE_MESSAGE_ERRORS
})