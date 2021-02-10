import React from 'react';
import styles from './RandomAnimationMenu.module.scss';
import { NavLink } from 'react-router-dom';

export const RandomAnimationMenuDom = ({ randomAnimation, openAnimationInfo }) => {
  return (
    <>
      {
        randomAnimation && <div className={styles.wrapper}>
          <NavLink to={`/animation/id/${randomAnimation.animationId}`} 
            onClick={() => openAnimationInfo(randomAnimation.animationId)}
            className={styles.animationItem} >
            <img src={`https://anime.amyasnikov.pro/images/animation_cover_${randomAnimation.animationId}.jpg`} 
              alt='img' className={styles.image} />
            <div className={styles.text}>
              <div className={styles.title}>
                {randomAnimation.nameRu || randomAnimation.nameEng}
              </div>
              {randomAnimation.dateStart && <div className={styles.description}>
                {randomAnimation.dateStart.split('-').reverse().join('.')} {randomAnimation.dateEnd && '- '}
                {randomAnimation.dateEnd && randomAnimation.dateEnd.split('-').reverse().join('.')}
              </div>}
              {randomAnimation.type && <div className={styles.description}>
                {randomAnimation.type}
              </div>}
            </div>
          </NavLink>
        </div>
      }
    </>
  )
}