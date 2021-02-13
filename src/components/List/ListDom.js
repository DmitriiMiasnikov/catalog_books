import React from 'react';
import styles from './List.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import PagesCounter from '../PagesCounter/PagesCounter';
import ListSorters from './../ListSorters/ListSorters';
import PageView from './../PageView/PageView';
import loading from './../../assets/Images/loading.svg';
import ButtonSwitcher from './../ButtonSwitcher/ButtonSwitcher';
import Stars from '../Stars/Stars';

export const ListDom = ({ list, openInfo, countAll,
  fetching, pageView, myUserInfo, listName }) => {
  const id = `${listName}Id`;
  return (
    <div className={styles.wrapper}>
      <PageView />
      <div className={styles.listSorters}>
        <ListSorters listName={listName} />
      </div>
      <div className={styles.pagesCounter}>
        <PagesCounter countAll={countAll} listName={listName} />
      </div>
      {!fetching && list && !list.length ? (
        <div className={styles.warning}>
          не найдено по текущему запросу
        </div>
      ) : fetching ? (
        <div className={styles.loading}>
          <img src={loading} alt='' />
        </div>
      ) : (
            <div className={classnames(styles.currentList, styles[pageView])}>
              {
                list && list.map((el, i) => {
                  return (
                    <div key={i} className={classnames(styles.item, { [styles.done]: myUserInfo && myUserInfo[listName].done.includes(el[listName]) })}>
                      {
                        pageView === 'small' && (
                          <div key={i} className={styles.itemInner}>
                            <NavLink to={`/description/${listName}/${el[id]}`} onClick={() => openInfo(el[id])} className={styles.imgLink}>
                              <img src={`https://anime.amyasnikov.pro/${listName}_small/${listName}_cover_${el[id]}_small.jpg`} 
                                alt='' className={styles.image} />
                            </NavLink>
                            <div className={styles.infoWrapper}>
                              {el.nameRu && <div className={styles.title}>
                                <NavLink to={`/description/${listName}/${el[id]}`} onClick={() => openInfo(el[id])}>{el.nameRu}</NavLink></div>}
                              {el.nameEng && !el.nameRu && <div className={classnames(styles.nameEng, { [styles.title]: !el.nameRu })}>
                                <NavLink to={`/description/${listName}/${el[id]}`} onClick={() => openInfo(el[id])}>{el.nameEng}</NavLink>
                              </div>}
                              {listName === 'animation' && el.dateStart && <div className={styles.date}>
                                {el.dateStart.split('-').reverse().join('.')} {el.dateEnd && '- '}
                                {el.dateEnd && el.dateEnd.split('-').reverse().join('.')}
                              </div>}
                              {
                                listName === 'manga' && <div className={styles.line}>
                                  автор:{el.author.map((el, j) => <span key={j} className={styles.lineInfo}>{el}</span>)}</div>
                              }
                              {
                                listName === 'manga' && <div className={styles.line}>
                                  год выхода:<span className={styles.lineInfo}>{el.date}</span></div>
                              }
                              {el.genre && <div className={styles.line}>жанр:
                                <span className={styles.lineInfo}>
                                  {el.genre.map((genreEl, j) => {
                                    return (
                                      <span className={styles.info} key={j}>
                                        <span className={styles.n}>{genreEl}</span>
                                        {j !== el.genre.length - 1 && <span>, </span>}
                                      </span>
                                    )
                                  })}
                                </span>
                              </div>}
                              {listName === 'animation' && el.type && <div className={styles.line}>
                                тип: <span className={styles.lineInfo}>{el.type}</span></div>}
                            </div>
                            <div className={styles.userControlPanel}>
                              <ButtonSwitcher currentId={el[id]} list={listName} />
                            </div>
                            <div className={styles.stars}>
                              <Stars list={listName} currentId={el[id]} />
                            </div>
                          </div>
                        )
                      }
                      {
                        pageView === 'medium' && (
                          <div key={i} className={styles.itemInner}>
                            <NavLink to={`/description/${listName}/${el[listName]}`} onClick={() => openInfo(el[id])} className={styles.imgLink}>
                              <img src={`https://anime.amyasnikov.pro/${listName}_small/${listName}_cover_${el[id]}_small.jpg`} alt='' className={styles.image} />
                            </NavLink>
                            <div className={styles.infoWrapper}>
                              {el.nameRu && <div className={styles.title}>
                                <NavLink to={`/description/${listName}/${el[id]}`} onClick={() => openInfo(el[id])}>{el.nameRu}</NavLink></div>}
                              {el.nameEng && !el.nameRu && <div className={classnames(styles.nameEng, { [styles.title]: !el.nameRu })}>
                                <NavLink to={`/description/${listName}/${el[id]}`} onClick={() => openInfo(el[id])}>{el.nameEng}</NavLink>
                              </div>}
                              {listName === 'animation' && el.dateStart && <div className={styles.date}>
                                {el.dateStart.split('-').reverse().join('.')}
                                {el.dateEnd && '-'}
                                {el.dateEnd && el.dateEnd.split('-').reverse().join('.')}
                              </div>}
                              {
                                listName === 'manga' && <div className={styles.line}>
                                  автор:{el.author.map((el, j) => <span key={j} className={styles.lineInfo}>{el}</span>)}</div>
                              }
                              {
                                listName === 'manga' && <div className={styles.line}>
                                  год выхода:<span className={styles.lineInfo}>{el.date}</span></div>
                              }
                              {listName === 'animation' && el.author && <div className={styles.line}>
                                автор: <span className={styles.lineInfo}>{el.author}</span></div>}
                              {el.genre && <div className={styles.line}>жанр:
                                <span className={styles.lineInfo}>
                                  {el.genre.map((genreEl, j) => {
                                    return (
                                      <span className={styles.info} key={j}>
                                        <span className={styles.n}>{genreEl}</span>
                                        {j !== el.genre.length - 1 && <span>, </span>}
                                      </span>
                                    )
                                  })}
                                </span>
                              </div>}
                              {listName === 'manga' && el.company && <div className={styles.line}>
                                компания: <span className={styles.lineInfo}>{el.company}</span></div>}
                              {listName === 'animation' && el.type && <div className={styles.line}>
                                тип: <span className={styles.lineInfo}>{el.type}</span></div>}
                              {listName === 'animation' && el.auditory && <div className={styles.line}>
                                аудитория: <span className={styles.lineInfo}>{el.auditory}</span></div>}
                            </div>
                            <div className={styles.userControlPanel}>
                              <ButtonSwitcher currentId={el[id]} list={listName} />
                            </div>
                            <div className={styles.stars}>
                              <Stars list={listName} currentId={el[id]} />
                            </div>
                          </div>
                        )
                      }
                      {
                        pageView === 'large' && (
                          <NavLink to={`/description/${listName}/${el[id]}`} onClick={() => openInfo(el[listName])}
                            key={i} className={styles.itemInner}>
                            <img src={`https://anime.amyasnikov.pro/${listName}_small/${listName}_cover_${el[id]}_small.jpg`}
                              alt='' className={styles.image} />
                            <div className={styles.text}>
                              <div className={styles.title}>
                                {el.nameRu || el.nameEng}
                              </div>
                              {listName === 'animation' && el.dateStart && <div className={styles.description}>
                                {el.dateStart.split('-').reverse().join('.')} {el.dateEnd && '- '}
                                {el.dateEnd && el.dateEnd.split('-').reverse().join('.')}
                              </div>}
                              {listName === 'manga' && el.date && <div className={styles.description}>{el.date}</div>}
                              {listName === 'manga' && el.author && <div className={styles.description}>{el.author.join(', ')}</div>}
                              {listName === 'ranobe' && el.author && <div className={styles.description}>{el.author}</div>}
                              {listName === 'ranobe' && el.language && <div className={styles.description}>{el.language}</div>}
                              {listName === 'animation' && el.type && <div className={styles.description}>
                                {el.type}
                              </div>}
                            </div>
                          </NavLink>
                        )
                      }
                    </div>
                  )
                })
              }
              <div className={styles.PagesCounterBottom}>
                <PagesCounter countAll={countAll} />
              </div>
            </div>
          )}
    </div>
  )
}