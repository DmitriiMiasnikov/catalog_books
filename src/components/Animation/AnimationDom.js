import React from 'react';
import styles from './Animation.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import PagesCounter from '../PagesCounter/PagesCounter';
import ListSorters from './../ListSorters/ListSorters';
import PageView from './../PageView/PageView';
import loading from './../../assets/Images/loading.svg';

export const AnimationDom = ({ animationList, openAnimationInfo, buttonsSortAnimation, countAllAnimation,
  fetching, pageView }) => {
  return (
    <div className={styles.wrapper}>
      <PageView />
      <ListSorters buttons={buttonsSortAnimation} />
      <PagesCounter countAll={countAllAnimation} />
      {!fetching && !animationList.length ? (
        <div className={styles.warning}>
          не найдено по текущему запросу
        </div>
      ) : fetching ? (
        <div className={styles.loading}>
          <img src={loading} alt='' />
        </div>
      ) : (
            <div className={classnames(styles.animationList, styles[pageView])}>
              {
                animationList && animationList.map((el, i) => {
                  return (
                    <div key={i} className={classnames(styles.item)}>
                      {
                        pageView === 'small' && (
                          <div key={i} className={styles.itemInner}>
                            <NavLink to={`/animation/id/${el.animeId}`} onClick={() => openAnimationInfo(el.animeId)} className={styles.imgLink}>
                              <img src={`/img/animation_cover_${el.animeId}.jpg`} alt='img' className={styles.image} />
                            </NavLink>
                            <div className={styles.infoWrapper}>
                              {el.nameRu && <div className={styles.title}>
                                <NavLink to={`/animation/id/${el.animeId}`} onClick={() => openAnimationInfo(el.animeId)}>{el.nameRu}</NavLink></div>}
                              {el.nameEng && !el.nameRu && <div className={classnames(styles.nameEng, { [styles.title]: !el.nameRu })}>
                                <NavLink to={`/animation/id/${el.animeId}`} onClick={() => openAnimationInfo(el.animeId)}>{el.nameEng}</NavLink>
                              </div>}
                              {el.date && <div className={styles.date}>
                                {el.date.map((dateEl, j) => {
                                  return (
                                    <span key={j}>
                                      {j === 3 && <span> - </span>}
                                      <span className={styles.n}>{dateEl}</span>
                                      {j !== el.date.length - 1 && j !== 2 && <span>.</span>}
                                    </span>
                                  )
                                })}
                              </div>}
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
                              {el.type && <div className={styles.line}>тип: <span className={styles.lineInfo}>{el.type}</span></div>}
                            </div>
                          </div>
                        )
                      }
                      {
                        pageView === 'medium' && (
                          <div key={i} className={styles.itemInner}>
                            <NavLink to={`/animation/id/${el.animeId}`} onClick={() => openAnimationInfo(el.animeId)} className={styles.imgLink}>
                              <img src={`/img/animation_cover_${el.animeId}.jpg`} alt='img' className={styles.image} />
                            </NavLink>
                            <div className={styles.infoWrapper}>
                              {el.nameRu && <div className={styles.title}>
                                <NavLink to={`/animation/id/${el.animeId}`} onClick={() => openAnimationInfo(el.animeId)}>{el.nameRu}</NavLink></div>}
                              {el.nameEng && !el.nameRu && <div className={classnames(styles.nameEng, { [styles.title]: !el.nameRu })}>
                                <NavLink to={`/animation/id/${el.animeId}`} onClick={() => openAnimationInfo(el.animeId)}>{el.nameEng}</NavLink>
                              </div>}
                              {el.date && <div className={styles.date}>
                                {el.date.map((dateEl, j) => {
                                  return (
                                    <span key={j}>
                                      {j === 3 && <span> - </span>}
                                      <span className={styles.n}>{dateEl}</span>
                                      {j !== el.date.length - 1 && j !== 2 && <span>.</span>}
                                    </span>
                                  )
                                })}
                              </div>}
                              {el.author && <div className={styles.line}>автор: <span className={styles.lineInfo}>{el.author}</span></div>}
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
                              {el.type && <div className={styles.line}>тип: <span className={styles.lineInfo}>{el.type}</span></div>}
                              {el.auditory && <div className={styles.line}>аудитория: <span className={styles.lineInfo}>{el.auditory}</span></div>}
                            </div>
                          </div>
                        )
                      }
                      {
                        pageView === 'large' && (
                          <NavLink to={`/animation/id/${el.animeId}`} onClick={() => openAnimationInfo(el.animeId)}
                            key={i} className={styles.itemInner}>
                            <img src={`/img/animation_cover_${el.animeId}.jpg`} alt='img' className={styles.image} />
                            <div className={styles.infoWrapper}>
                              {el.nameRu && <div className={styles.title}>{el.nameRu}</div>}
                              {el.nameEng && !el.nameRu && <div className={classnames(styles.nameEng, { [styles.title]: !el.nameRu })}>
                                {el.nameEng}
                              </div>}
                            </div>
                          </NavLink>
                        )
                      }
                    </div>
                  )
                })
              }
              <PagesCounter countAll={countAllAnimation} />
            </div>
          )}
    </div>
  )
}