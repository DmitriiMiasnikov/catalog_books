import React from 'react';
import styles from './User.module.scss';
import { NavLink } from 'react-router-dom';
import loading from './../../assets/Images/loading.svg';
import classnames from 'classnames';
import angle from './../../assets/Images/angle.svg';

export const UserDom = ({ userInfo, selectedUserMine, usersAnimationList, openAnimationInfo,
  restCountAnimation, openAnimationList, fetching, buttonsAnimation, buttonsMain, ButtonsMainHandler,
  ButtonsAnimationHandler }) => {
  return (
    <div>
      {userInfo &&
        <div className={styles.wrapper}>
          <div className={styles.name}>{userInfo.userName} {selectedUserMine && <span>(Мой профиль)</span>}</div>
          <div className={styles.books}>{buttonsMain.find(el => el.name === 'books').text}:</div>
          <div className={styles.animationTitle} onClick={() => ButtonsMainHandler('animation')}>
            <span>{buttonsMain.find(el => el.name === 'animation').text}</span>
            <img src={angle} className={classnames(styles.angle, {
              [styles.reverse]: !buttonsMain.find(el => el.name === 'animation').active
            })} />
          </div>
          <div className={classnames(styles.animationBlock, {
            [styles.hide]: !buttonsMain.find(el => el.name === 'animation').active
          })}>
            {
              usersAnimationList && Object.keys(usersAnimationList).map((listName, j) => {
                return (
                  <div key={j} className={styles.animationInnerBlock}>
                    <div className={styles.animationSubTitle} onClick={() => ButtonsAnimationHandler(listName)}>
                      <span>{buttonsAnimation.find(el => el.name === listName).text}</span>
                      <img src={angle} className={classnames(styles.angle, {
                        [styles.reverse]: !buttonsAnimation.find(el => el.name === listName).active
                      })} />
                    </div>
                    <div className={classnames(styles.animationWrap, {
                      [styles.hide]: !buttonsAnimation.find(el => el.name === listName).active,
                      [styles.empty]: !usersAnimationList[listName].length
                    })}>
                      {
                        fetching && (
                          <div className={styles.loading}>
                            <img src={loading} alt='' />
                          </div>
                        )
                      }
                      {
                        !fetching && Boolean(usersAnimationList[listName].length) && (
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
                        !fetching && !Boolean(usersAnimationList[listName].length) && (
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
          </div>
        </div>}
    </div >
  )
}