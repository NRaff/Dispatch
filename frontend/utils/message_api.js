export const createMessage = postMessage => {
  const message = {
    thread_id: postMessage.threadId,
    message: postMessage.message
  }
  return (
    $.ajax({
      method: 'POST',
      url: 'api/messages',
      data: { message }
    })
  )
}

export const updateMessage = updateMessage => {
  const message = {
    thread_id: updateMessage.threadId,
    message: updateMessage.message
  }
  return (
    $.ajax({
      method: 'PATCH',
      url: `api/messages/${updateMessage.id}`,
      data: {message}
    })
  )
}

export const deleteMessage = messageId => (
  $.ajax({
    method: 'DELETE',
    url: `api/messages/${messageId}`
  })
)