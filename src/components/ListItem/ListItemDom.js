import React from 'react';
import styles from './ListItem.module.scss';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import ButtonSwitcher from './../ButtonSwitcher/ButtonSwitcher';
import Stars from '../Stars/Stars';
import image_not_found from './../../assets/Images/image-not-found.svg'

export const ListItemDom = ({ view, listName, id, openInfo, item, myUserInfo, descriptionOnHover,
  buttonsControl, filterHandler }) => {
  if (view === 'list') {
    return (
      <div className={classnames(styles.wrapper, { [styles.done]: myUserInfo && myUserInfo[listName].done.includes(item[listName]) })}>
        <NavLink to={`/description/${listName}/${item[id]}`} onClick={() => openInfo(item[id])}
          className={classnames(styles.imgLink, styles[view])}>
          <img onError={(image) => { image.onerror = null; image.target.setAttribute('src', image_not_found) }}
            src={`https://anime.amyasnikov.pro/${listName}_small/${listName}_cover_${item[id]}_small.jpg`}
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
              Тип:{<span className={styles.data} onClick={() => filterHandler(item.type.split(' ')[0])}>
                <span className={styles.link}>{item.type.split(' ')[0] + ' '}</span>
                <span>{item.type.split(' ').slice(1).join(' ')}</span>
              </span>}</div>}
            {listName === 'manga' && item.date && <div>
              Год выхода:{<span className={classnames(styles.data, styles.link)}
                onClick={() => filterHandler(item.date)}>{item.date}</span>}</div>}
            {listName === 'ranobe' && item.language && <div>
              Язык оригинала:{<span className={classnames(styles.data, styles.link)}
                onClick={() => filterHandler(item.language)}>{item.language}</span>}</div>}
          </div>
          <div className={styles.line}>
            {item.genre && <div>Жанр:<span className={styles.data}>
              {item.genre.map((genreEl, j) => {
                return (
                  <span className={styles.genreEl} key={j}>
                    <span className={classnames(styles.n, styles.link)} onClick={() => filterHandler(genreEl)}>{genreEl}</span>
                    {j !== item.genre.length - 1 && <span>{', '}</span>}
                  </span>
                )
              })}
            </span>
            </div>}
          </div>
          <div className={styles.buttonSwitcher}>
            <ButtonSwitcher currentId={item[id]} list={listName} buttons={buttonsControl} />
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
          <img onError={(image) => { image.onerror = null; image.target.setAttribute('src', image_not_found) }}
            src={`https://anime.amyasnikov.pro/${listName}_small/${listName}_cover_${item[id]}_small.jpg`}
            alt='' className={styles.image} />
        </NavLink>
        <div className={classnames(styles.info, { [styles.placeForButtons]: myUserInfo })}>
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
              Тип:{<span className={styles.data} onClick={() => filterHandler(item.type.split(' ')[0])}>
                <span className={styles.link}>{item.type.split(' ')[0] + ' '}</span>
                <span>{item.type.split(' ').slice(1).join(' ')}</span>
              </span>}</div>}
            {listName === 'manga' && item.date && <div>
              Год выхода:{<span className={classnames(styles.data, styles.link)}
                onClick={() => filterHandler(item.date)}>{item.date}</span>}</div>}
            {listName === 'ranobe' && item.language && <div>
              Язык оригинала:{<span className={classnames(styles.data, styles.link)}
                onClick={() => filterHandler(item.language)}>{item.language}</span>}</div>}
          </div>
          <div className={styles.line}>
            {item.genre && <div>Жанр:<span className={styles.data}>
              {item.genre.map((genreEl, j) => {
                return (
                  <span className={styles.genreEl} key={j}>
                    <span className={classnames(styles.n, styles.link)} onClick={() => filterHandler(genreEl)}>{genreEl}</span>
                    {j !== item.genre.length - 1 && <span>, </span>}
                  </span>
                )
              })}
            </span>
            </div>}
          </div>
          <div className={styles.line}>
            {listName === 'animation' && item.auditory && <div>
              Аудитория:{<span className={classnames(styles.data, styles.link)}
                onClick={() => filterHandler(item.auditory)}>{item.auditory}</span>}</div>}
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
            <ButtonSwitcher currentId={item[id]} list={listName} buttons={buttonsControl} />
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
      <NavLink to={`/description/${listName}/${item[id]}`} onClick={() => openInfo(item[id])}
        className={classnames(styles.wrapper, styles[view], { [styles.descriptionOnHover]: descriptionOnHover })}>
        <div className={styles.topBlock}>
          <div className={styles.stars} onClick={(e) => { e.stopPropagation(); e.preventDefault() }}>
            <Stars list={listName} currentId={item[id]} direction={'bottom'} />
          </div>
        </div>
        <img onError={(image) => { image.onerror = null; image.target.setAttribute('src', image_not_found) }}
          src={`https://anime.amyasnikov.pro/${listName}_small/${listName}_cover_${item[id]}_small.jpg`}
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