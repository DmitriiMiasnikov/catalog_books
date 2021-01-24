const stateDefault = {
  users: [
    {
      userId: 1,
      userName: 'Dmitrii',
      email: 'dmitriimiasnikov@gmail.com',
      classes: ['admin', 'creator', 'user'],
      booksRead: [1, 2, 3],
      booksToRead: [4],
    }
  ],
  currentUserId: 1,
  isAuth: true,
}

export const userReducer = (state = stateDefault, action) => {
  switch (action.type) {
    default: break
  }
  return state;
}