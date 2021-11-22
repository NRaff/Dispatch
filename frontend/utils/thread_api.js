export const createThread = thread => (
  $.ajax({
    method: 'POST',
    url: 'api/message_threads',
    data: {thread}
  })
)

export const updateThread = thread => (
  $.ajax({
    method: 'PATCH',
    url: `api/message_threads/${thread.id}`,
    data: {thread}
  })
)

export const deleteThread = threadId => (
  $.ajax({
    method: 'DELETE',
    url: `api/message_threads/${threadId}`
  })
)