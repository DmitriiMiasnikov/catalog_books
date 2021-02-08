import React from 'react';
import styles from './Animation.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import PagesCounter from '../PagesCounter/PagesCounter';
import ListSorters from './../ListSorters/ListSorters';
import PageView from './../PageView/PageView';
import loading from './../../assets/Images/loading.svg';
import UserControlPanel from './../UserControlPanel/UserControlPanel';

export const AnimationDom = ({ animationList, openAnimationInfo, buttonsSortAnimation, countAllAnimation,
  fetching, pageView, myUserInfo }) => {
  return (
    <div className={styles.wrapper}>
      <PageView />
      <div className={styles.listSorters}>
        <ListSorters buttons={buttonsSortAnimation} />
      </div>
      <div className={styles.pagesCounter}>
        <PagesCounter countAll={countAllAnimation} />
      </div>
      {!fetching && animationList && !animationList.length ? (
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
                    <div key={i} className={classnames(styles.item, {[styles.done]: myUserInfo && myUserInfo.animation.done.includes(el.animationId) })}>
                      {
                        pageView === 'small' && (
                          <div key={i} className={styles.itemInner}>
                            <NavLink to={`/animation/id/${el.animationId}`} onClick={() => openAnimationInfo(el.animationId)} className={styles.imgLink}>
                              <img src={`/img/animation_cover_${el.animationId}.jpg`} alt='img' className={styles.image} />
                            </NavLink>
                            <div className={styles.infoWrapper}>
                              {el.nameRu && <div className={styles.title}>
                                <NavLink to={`/animation/id/${el.animationId}`} onClick={() => openAnimationInfo(el.animationId)}>{el.nameRu}</NavLink></div>}
                              {el.nameEng && !el.nameRu && <div className={classnames(styles.nameEng, { [styles.title]: !el.nameRu })}>
                                <NavLink to={`/animation/id/${el.animationId}`} onClick={() => openAnimationInfo(el.animationId)}>{el.nameEng}</NavLink>
                              </div>}
                              {el.dateStart && <div className={styles.date}>
                                {el.dateStart.split('-').reverse().join('.')} {el.dateEnd && '- '}
                                {el.dateEnd && el.dateEnd.split('-').reverse().join('.')}
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
                            <div className={styles.userControlPanel}>
                            <UserControlPanel currentAnimationId={el.animationId}/>
                            </div>
                          </div>
                        )
                      }
                      {
                        pageView === 'medium' && (
                          <div key={i} className={styles.itemInner}>
                            <NavLink to={`/animation/id/${el.animationId}`} onClick={() => openAnimationInfo(el.animationId)} className={styles.imgLink}>
                              <img src={`/img/animation_cover_${el.animationId}.jpg`} alt='img' className={styles.image} />
                            </NavLink>
                            <div className={styles.infoWrapper}>
                              {el.nameRu && <div className={styles.title}>
                                <NavLink to={`/animation/id/${el.animationId}`} onClick={() => openAnimationInfo(el.animationId)}>{el.nameRu}</NavLink></div>}
                              {el.nameEng && !el.nameRu && <div className={classnames(styles.nameEng, { [styles.title]: !el.nameRu })}>
                                <NavLink to={`/animation/id/${el.animationId}`} onClick={() => openAnimationInfo(el.animationId)}>{el.nameEng}</NavLink>
                              </div>}
                              {el.dateStart && <div className={styles.date}>
                                {el.dateStart.split('-').reverse().join('.')} {el.dateEnd && '-'} {el.dateEnd && el.dateEnd.split('-').reverse().join('.')}
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
                            <div className={styles.userControlPanel}>
                            <UserControlPanel currentAnimationId={el.animationId}/>
                            </div>
                          </div>
                        )
                      }
                      {
                        pageView === 'large' && (
                          <NavLink to={`/animation/id/${el.animationId}`} onClick={() => openAnimationInfo(el.animationId)}
                            key={i} className={styles.itemInner}>
                            <img src={`/img/animation_cover_${el.animationId}.jpg`} alt='img' className={styles.image} />
                            <div className={styles.text}>
                              <div className={styles.title}>
                                {el.nameRu || el.nameEng}
                              </div>
                              {el.dateStart && <div className={styles.description}>
                                {el.dateStart.split('-').reverse().join('.')} {el.dateEnd && '- '}
                                {el.dateEnd && el.dateEnd.split('-').reverse().join('.')}
                              </div>}
                              {el.type && <div className={styles.description}>
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
                <PagesCounter countAll={countAllAnimation} />
              </div>
            </div>
          )}
    </div>
  )
}