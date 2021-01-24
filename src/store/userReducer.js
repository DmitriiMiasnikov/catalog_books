const GET_USER_ID = 'GET_USER_ID';

const stateDefault = {
  users: [
    {
      userId: 1,
      userName: 'Dmitrii',
      email: 'dmitriimiasnikov@gmail.com',
      classes: ['admin', 'creator', 'user'],
      booksRead: [1, 2, 3],
      booksToRead: [4],
    },
    {
      userId: 2,
      userName: 'Anton',
      email: 'anton@gmail.com',
      classes: ['user'],
      booksRead: [1, 2],
      booksToRead: [4],
    }
  ],
  currentUserId: 1,
  selectedUser: 2,
  isAuth: true,
}

export const userReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case(GET_USER_ID): {
      return {...state, selectedUser: action.id }
    }
    default: break
  }
  return state;
}

export const getUserId = (id) => {
  return { type: GET_USER_ID, id}
}