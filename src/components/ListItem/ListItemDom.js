import React from 'react';
import styles from './ListItem.module.scss';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import ButtonSwitcher from './../ButtonSwitcher/ButtonSwitcher';
import Stars from '../Stars/Stars';

export const ListItemDom = ({ view, listName, id, openInfo, item, myUserInfo }) => {
  if (view === 'list') {
    return (
      <div className={classnames(styles.wrapper, { [styles.done]: myUserInfo && myUserInfo[listName].done.includes(item[listName]) })}>
        <NavLink to={`/description/${listName}/${item[id]}`} onClick={() => openInfo(item[id])}
          className={classnames(styles.imgLink, styles[view])}>
          <img src={`https://anime.amyasnikov.pro/${listName}_small/${listName}_cover_${item[id]}_small.jpg`}
            alt='' className={styles.image} />
        </NavLink>
        <div className={classnames(styles.info, { [styles.placeForButtons]: myUserInfo })}>
          {item.nameRu && <div className={styles.title}>
            <NavLink to={`/description/${listName}/${item[id]}`} onClick={() => openInfo(item[id])}>{item.nameRu}</NavLink></div>}
          {item.nameEng && !item.nameRu && <div className={classnames({ [styles.title]: !item.nameRu })}>
            <NavLink to={`/description/${listName}/${item[id]}`} onClick={() => openInfo(item[id])}>{item.nameEng}</NavLink>
          </div>}

          <div className={styles.line}>
            {listName === 'animation' && item.dateStart && <div>
              Выпуск:<span className={styles.data}>
                {item.dateStart.split('-').reverse().join('.')} {item.dateEnd && '- '}
                {item.dateEnd && item.dateEnd.split('-').reverse().join('.')}
              </span></div>}
            {listName === 'manga' && item.author && <div>
              Автор:{item.author.map((el, j) => <span key={j} className={styles.data}>{el}</span>)}</div>}
            {listName === 'ranobe' && item.author && <div>
              Автор:{<span className={styles.data}>{item.author}</span>}</div>}
          </div>
          <div className={styles.line}>
            {listName === 'animation' && item.type && <div>
              Автор:{<span className={styles.data}>{item.type}</span>}</div>}
            {listName === 'manga' && item.date && <div>
              Год выхода:{<span className={styles.data}>{item.date}</span>}</div>}
            {listName === 'ranobe' && item.language && <div>
              Язык оригинала:{<span className={styles.data}>{item.language}</span>}</div>}
          </div>
          <div className={styles.line}>
            {item.genre && <div>Жанр:<span className={styles.data}>
              {item.genre.map((genreEl, j) => {
                return (
                  <span className={styles.genreEl} key={j}>
                    <span className={styles.n}>{genreEl}</span>
                    {j !== item.genre.length - 1 && <span>{', '}</span>}
                  </span>
                )
              })}
            </span>
            </div>}
          </div>
          <div className={styles.buttonSwitcher}>
            <ButtonSwitcher currentId={item[id]} list={listName} />
          </div>
          <div className={styles.stars}>
            <Stars list={listName} currentId={item[id]} />
          </div>
        </div>
      </div>
    )
  }
  if (view === 'medium_list') {
    return (
      <div className={classnames(styles.wrapper, { [styles.done]: myUserInfo && myUserInfo[listName].done.includes(item[listName]) })}>
        <NavLink to={`/description/${listName}/${item[id]}`} onClick={() => openInfo(item[id])}
          className={classnames(styles.imgLink, styles[view])}>
          <img src={`https://anime.amyasnikov.pro/${listName}_small/${listName}_cover_${item[id]}_small.jpg`}
            alt='' className={styles.image} />
        </NavLink>
        <div className={styles.info}>
          {item.nameRu && <div className={styles.title}>
            <NavLink to={`/description/${listName}/${item[id]}`} onClick={() => openInfo(item[id])}>{item.nameRu}</NavLink></div>}
          {item.nameEng && !item.nameRu && <div className={classnames(styles.nameEng, { [styles.title]: !item.nameRu })}>
            <NavLink to={`/description/${listName}/${item[id]}`} onClick={() => openInfo(item[id])}>{item.nameEng}</NavLink>
          </div>}

          <div className={styles.line}>
            {listName === 'animation' && item.dateStart && <div>
              <span className={styles.data}>
                {item.dateStart.split('-').reverse().join('.')} {item.dateEnd && '- '}
                {item.dateEnd && item.dateEnd.split('-').reverse().join('.')}
              </span></div>}
            {listName === 'manga' && item.author && <div>
              Автор:{item.author.map((el, j) => <span key={j} className={styles.data}>{el}</span>)}</div>}
            {listName === 'ranobe' && item.author && <div>
              Автор:{<span className={styles.data}>{item.author}</span>}</div>}
          </div>
          <div className={styles.line}>
            {listName === 'animation' && item.type && <div>
              Режиссёр:{<span className={styles.data}>{item.type}</span>}</div>}
            {listName === 'manga' && item.date && <div>
              Год выхода:{<span className={styles.data}>{item.type}</span>}</div>}
            {listName === 'ranobe' && item.language && <div>
              Язык оригинала:{<span className={styles.data}>{item.language}</span>}</div>}
          </div>
          <div className={styles.line}>
            {item.genre && <div>Жанр:<span className={styles.data}>
              {item.genre.map((genreEl, j) => {
                return (
                  <span className={styles.genreEl} key={j}>
                    <span className={styles.n}>{genreEl}</span>
                    {j !== item.genre.length - 1 && <span>, </span>}
                  </span>
                )
              })}
            </span>
            </div>}
          </div>
          <div className={styles.line}>
            {listName === 'animation' && item.auditory && <div>
              Аудитория:{<span className={styles.data}>{item.auditory}</span>}</div>}
            {listName === 'manga' && item.company && <div>
              Компания:{<span className={styles.data}>{item.company}</span>}</div>}
            {listName === 'ranobe' && item.description && <div>
              Краткое описание:{<span className={styles.data}>
                {item.description.split(' ').splice(0, 25).join(' ')}{' ...'}</span>}</div>}
          </div>
          <div className={styles.line}>
            {listName === 'animation' && item.base && <div>
              Основано на:{<span className={styles.data}>{item.base}</span>}</div>}
          </div>
          <div className={styles.buttonSwitcher}>
            <ButtonSwitcher currentId={item[id]} list={listName} />
          </div>
          <div className={styles.stars}>
            <Stars list={listName} currentId={item[id]} />
          </div>
        </div>
      </div>
    )
  }
  if (view === 'tile') {
    return (
      <NavLink to={`/description/${listName}/${item[id]}`} onClick={() => openInfo(item[listName])}
        className={classnames(styles.wrapper, styles[view])}>
        <img src={`https://anime.amyasnikov.pro/${listName}_small/${listName}_cover_${item[id]}_small.jpg`}
          alt='' className={styles.image} />
        <div className={styles.text}>
          <div className={styles.title}>
            {item.nameRu || item.nameEng}
          </div>
          <div className={styles.line}>
            {listName === 'animation' && item.dateStart && <div className={styles.data}>
              {item.dateStart.split('-').reverse().join('.')} {item.dateEnd && '- '}
              {item.dateEnd && item.dateEnd.split('-').reverse().join('.')}
            </div>}
            {listName === 'manga' && item.date && <div className={styles.data}>{item.date}</div>}
            {listName === 'ranobe' && item.author && <div className={styles.data}>{item.author}</div>}
          </div>
          <div className={styles.line}>
            {listName === 'animation' && item.type && <div className={styles.data}>{item.type}</div>}
            {listName === 'manga' && item.author && <div className={styles.data}>{item.author.join(', ')}</div>}
            {listName === 'ranobe' && item.language && <div className={styles.data}>{item.language}</div>}
          </div>
        </div>
      </NavLink>
    )
  }
}