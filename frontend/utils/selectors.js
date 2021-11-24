export const activeThreadMessages = (threadId, allMessages) => {
  let threadMessages = allMessages.filter(msg => {

    return msg.threadId === threadId
  })
  return threadMessages
}