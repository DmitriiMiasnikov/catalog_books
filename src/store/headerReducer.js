const stateDefault = {
  menuItems: [
    {item: 'Главная', link: '/main'},
    {item: 'Книги', link: '/books'},
    {item: 'Аниме', link: '/animation/list'},
  ],
  animationItems: [
    'комедия',
    'повседневность', 'приключения',
    'фантастика', 'мистика',
    'фэнтези', 'драма',
    'спорт', 'романтика',
    'триллер', 'меха',
    'этти', 'детектив',
    'махо-сёдзё', 'боевые искусства',
    'музыкальный', 'ужасы',
    'образовательный'
  ]
}

export const headerReducer = (state = stateDefault, action) => {
  switch(action.type) {
    default: break
  }
  return state;
}