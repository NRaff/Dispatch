const state = {
  entities: {
    users: {
      1: {
        id: 1,
        username: "ngunray",
        email: "ngunray@email.com",
        displayName: "Nute Gunray",
        threadIds: [1,2],
      },
      2: {
        id: 2,
        username: "ggrievous",
        email: "ggrievous@email.com",
        displayName: "General Grievous",
        threadIds: [1,2,3],
      },
      3: {
        id: 3,
        username: "01kenobi",
        email: "01kenobi@email.com",
        displayName: "Obi-wan Kenobi",
        threadIds: [1, 3],
      }
    },
    threads: {
      1: {
        id: 1,
        name: "Overview",
        isThread: true,
        userIds: [1,2,3],
      },
      2: {
        id: 2,
        name: "ggrievous, ngunray",
        isThread: false,
        userIds: [1,2],
      },
      3: {
        id: 3,
        name: "01kenobi, ggrievous",
        isThread: false,
        userIds: [2,3]
      },
    },
    messages: {
      1: {
        id: 1,
        message: "Safe? Chancellor Palpatine managed to escape your grip, General. Without Count Dooku, I have doubts about your ability to keep us safe. ",
        senderId: 1,
        threadId: 1,
      },
      2: {
        id: 2,
        message: "Be thankful, Viceroy, you have not found yourself in my grip ... Your ship is waiting.",
        senderId: 2,
        threadId: 1,
      },
      3: {
        id: 3,
        message: "Hello, there!",
        senderId: 3,
        threadId: 3,
      },
      4: {
        id:4,
        message: "General Kenobi, you are a bold one. I find your behavior bewildering...Surely you realize you're doomed. Kill him!",
        senderId: 2,
        threadId: 3,
      },
      5: {
        id: 5,
        message: "Back away. I will deal with this Jedi slime myself.",
        senderId: 2,
        threadId: 3,
      },
      6: {
        id: 6,
        message: "Your move.",
        senderId: 3,
        threadId: 3,
      }
    }
  },
  ui: {
    loading: true/false,
    modal: true/false
  },
  errors: {
    login: ["Incorrect username/password"],
    newMessage: ["Recipient can't be blank"],
  },
  session: {
    currentUserId: 1
  },
}