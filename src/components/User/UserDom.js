import React from 'react';
import styles from './User.module.scss';
import { NavLink } from 'react-router-dom';

export const UserDom = ({ userInfo, selectedUserMine, usersAnimationList, openAnimationInfo,
  restCountAnimation, openAnimationList }) => {
  return (
    <div>
      {userInfo &&
        <div className={styles.wrapper}>
          <div className={styles.name}>{userInfo.userName} {selectedUserMine && <span>(Мой профиль)</span>}</div>
          <div className={styles.books}>книжная полка:</div>
          <div className={styles.animationTitle}>Аниме:</div>
          <div className={styles.animationSubTitle}>Просмотрено:</div>
          <div className={styles.animationWrap}>
            {
              usersAnimationList && usersAnimationList.map((el, i) => {
                return (
                  <NavLink to={`/animation/id/${el.animeId}`} onClick={() => openAnimationInfo(el.animeId)}
                    className={styles.animationItem} key={i} >
                    <img src={`/img/animation_cover_${el.animeId}.jpg`} alt='img' className={styles.image}
                      title={el.nameRu || el.nameEng} />
                  </NavLink>
                )
              })
            }
            <NavLink to={`/animation/list`} onClick={() => openAnimationList()}
              className={styles.restAnimation}>
                еще {restCountAnimation} <span>показать все</span>
            </NavLink>
          </div>
        </div>}
    </div>
  )
}