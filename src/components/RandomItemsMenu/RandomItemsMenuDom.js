import React from 'react';
import styles from './RandomItemsMenu.module.scss';
import { NavLink } from 'react-router-dom';

export const RandomItemsMenuDom = ({ randomItems, openAnimationInfo }) => {
  return (
    <>
      {
        randomItems && Object.keys(randomItems).map((item, i) => {
          return (
            <div className={styles.wrapper} key={i}>
              <NavLink to={`/${item}/id/${randomItems[item][item === 'animation' ? 'animationId' : 'mangaId']}`}
                onClick={() => openAnimationInfo(randomItems[item].animationId)}
                className={styles.animationItem} >
                <img src={`https://anime.amyasnikov.pro/images/${item}_cover_${randomItems[item].animationId}.jpg`}
                  alt='img' className={styles.image} />
                <div className={styles.text}>
                  <div className={styles.title}>
                    {randomItems[item].nameRu || randomItems[item].nameEng}
                  </div>
                  {randomItems[item].dateStart && <div className={styles.description}>
                    {randomItems[item].dateStart.split('-').reverse().join('.')} {randomItems[item].dateEnd && '- '}
                    {randomItems[item].dateEnd && randomItems[item].dateEnd.split('-').reverse().join('.')}
                  </div>}
                  {randomItems[item].type && <div className={styles.description}>
                    {randomItems[item].type}
                  </div>}
                </div>
              </NavLink>
            </div>
          )
        })

      }
    </>
  )
}