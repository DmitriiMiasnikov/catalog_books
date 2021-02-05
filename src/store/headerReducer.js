const stateDefault = {
  menuItems: [
    {item: 'Главная', link: '/main'},
    {item: 'Книги', link: '/books'},
    {item: 'Аниме', link: '/animation/list'},
  ]
}

export const headerReducer = (state = stateDefault, action) => {
  switch(action.type) {
    default: break
  }
  return state;
}