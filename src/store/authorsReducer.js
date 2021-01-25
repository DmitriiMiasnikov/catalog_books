const stateDefault = {
  authors: [
    {
      authorId: 1,
      name: 'author111',
      country: 'Россия',
      birthDate: 2000-12-10,
    },
    {
      authorId: 2,
      name: 'author2222',
      country: 'США',
      birthDate: 1990-1-10,
    },
  ]
}

export const authorsReducer = (state = stateDefault, action) => {
  switch(action.type) {
    default: break
  }
  return state;
}