import React from 'react';
import styles from './User.module.scss';
import { NavLink } from 'react-router-dom';
import loading from './../../assets/Images/loading.svg';

export const UserDom = ({ userInfo, selectedUserMine, usersAnimationList, openAnimationInfo,
  restCountAnimation, openAnimationList, fetching, listNamesAnimation }) => {
  return (
    <div>
      {userInfo &&
        <div className={styles.wrapper}>
          <div className={styles.name}>{userInfo.userName} {selectedUserMine && <span>(Мой профиль)</span>}</div>
          <div className={styles.books}>книжная полка:</div>
          <div className={styles.animationTitle}>Аниме:</div>
          {
            usersAnimationList && Object.keys(usersAnimationList).map((listName, j) => {
              return (
                <div className={styles.animationStatus} key={j}>
                  <div className={styles.animationSubTitle}>
                    {listNamesAnimation.find(el => el.name === listName).text}
                  </div>
                  <div className={styles.animationWrap}>
                    {
                      fetching && (
                        <div className={styles.loading}>
                          <img src={loading} alt='' />
                        </div>
                      )
                    }
                    {
                      !fetching && usersAnimationList[listName] && (
                        <div className={styles.animationListWrap}>
                          {
                            usersAnimationList[listName].map((el, i) => {
                              return (
                                <NavLink to={`/animation/id/${el.animeId}`} onClick={() => openAnimationInfo(el.animeId)}
                                  className={styles.animationItem} key={i} >
                                  <img src={`/img/animation_cover_${el.animeId}.jpg`} alt='img' className={styles.image}
                                    title={el.nameRu || el.nameEng} />
                                </NavLink>
                              )
                            })
                          }
                          {Boolean(restCountAnimation) && <NavLink to={`/animation/list`} onClick={() => openAnimationList()}
                            className={styles.restAnimation}>
                            еще {restCountAnimation} <span>показать все</span>
                          </NavLink>}
                        </div>
                      )
                    }
                    {
                      !fetching && !usersAnimationList[listName] && (
                        <div className={styles.noItems}>
                          список пуст
                        </div>
                      )
                    }
                  </div>
                </div>
              )
            })
          }
        </div>}
    </div >
  )
}