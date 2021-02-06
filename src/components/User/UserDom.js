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
            })} alt='' />
          </div>
          <div className={classnames(styles.animationBlock, {
            [styles.hide]: !buttonsMain.find(el => el.name === 'animation').active
          })}>
            {
              userInfo && Object.keys(userInfo.animation).map((listName, j) => {
                return (
                  <div key={j} className={styles.animationInnerBlock}>
                    <div className={styles.animationSubTitle} onClick={() => ButtonsAnimationHandler(listName)}>
                      <span>{buttonsAnimation.find(el => el.name === listName).text}</span>
                      <img src={angle} className={classnames(styles.angle, {
                        [styles.reverse]: !buttonsAnimation.find(el => el.name === listName).active
                      })} alt='' />
                    </div>
                    <div className={classnames(styles.animationWrap, {
                      [styles.hide]: !buttonsAnimation.find(el => el.name === listName).active,
                      [styles.empty]: !userInfo.animation[listName].length
                    })}>
                      {
                        fetching && Boolean(userInfo.animation[listName].length) && (
                          <div className={styles.loading}>
                            <img src={loading} alt='' />
                          </div>
                        )
                      }
                      {
                        !fetching && usersAnimationList && Boolean(usersAnimationList[listName].length) && (
                          <div className={styles.animationListWrap}>
                            {
                              usersAnimationList[listName].map((el, i) => {
                                return (
                                  <NavLink to={`/animation/id/${el.animationId}`} onClick={() => openAnimationInfo(el.animationId)}
                                    className={styles.animationItem} key={i} >
                                    <img src={`/img/animation_cover_${el.animationId}.jpg`} alt='img' className={styles.image} />
                                    <div className={styles.text}>
                                      <div className={styles.title}>
                                        {el.nameRu || el.nameEng}
                                      </div>
                                      {el.date && <div className={styles.description}>
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
                                      {el.type && <div  className={styles.description}>
                                        {el.type}
                                      </div>}
                                    </div>
                                  </NavLink>
                                )
                              })
                            }
                            {Boolean(restCountAnimation[listName]) && <NavLink to={`/animation/list`} onClick={() => openAnimationList()}
                              className={styles.restAnimation}>
                              еще {restCountAnimation[listName]} <span>показать все</span>
                            </NavLink>}
                          </div>
                        )
                      }
                      {
                        userInfo && !Boolean(userInfo.animation[listName].length) && (
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