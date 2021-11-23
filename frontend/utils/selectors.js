export const activeThreadMessages = (threadId, allMessages) => {
  return allMessages.filter(msg => msg.threadId === threadId)
}