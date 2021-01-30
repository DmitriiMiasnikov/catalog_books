const GET_USER_ID = 'GET_USER_ID';

const stateDefault = {
  users: [
    {
      userId: 1,
      userName: 'Dmitrii',
      email: 'dmitriimiasnikov@gmail.com',
      rights: ['admin', 'creator', 'user'],
      books: {
        queue: [4],
        read: [1, 2, 3],
        selected: [5, 3, 2]
      },
      animation: {
        queue: [4],
        viewed: [1, 2, 3]
      }
    },
    {
      userId: 2,
      userName: 'Anton',
      email: 'anton@gmail.com',
      rights: ['user'],
      books: {
        queue: [4],
        read: [1, 2, 3],
        selected: [5, 3, 2]
      },
      animation: {
        queue: [4],
        viewed: [1, 2, 3]
      }
    }
  ],
  currentUserId: 1,
  selectedUser: 2,
  isAuth: true,
}

export const usersReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_USER_ID): {
      return { ...state, selectedUser: action.id }
    }
    default: break
  }
  return state;
}

export const getUserId = (id) => {
  return { type: GET_USER_ID, id }
}