const stateDefault = {
  books: [
    {
      bookId: 1,
      name: 'firstbook',
      autor: 'nameautor'
    },
    {
      bookId: 2,
      name: 'secondbook',
      autor: 'nameautor'
    }
  ]
}

export const booksReducer = (state = stateDefault, action) => {
  switch(action.type) {
    default: break
  }
  return state;
}