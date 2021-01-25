const stateDefault = {
  books: [
    {
      bookId: 1,
      name: 'firstbook',
      authorId: 1,
      year: 2000,
    },
    {
      bookId: 2,
      name: 'secondbook',
      authorId: 2,
      year: 2010
    }
  ]
}

export const booksReducer = (state = stateDefault, action) => {
  switch(action.type) {
    default: break
  }
  return state;
}