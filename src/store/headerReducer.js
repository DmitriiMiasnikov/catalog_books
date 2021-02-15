const stateDefault = {
  menuItems: [
    {item: 'Главная', link: '/main', page: 'mainPage'},
    {item: 'Аниме', link: '/list/animation', list: 'animation', page: 'animationListPage'},
    {item: 'Манга', link: '/list/manga', list: 'manga', page: 'mangaListPage'},
    {item: 'Ранобе', link: '/list/ranobe', list: 'ranobe', page: 'ranobeListPage'},
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