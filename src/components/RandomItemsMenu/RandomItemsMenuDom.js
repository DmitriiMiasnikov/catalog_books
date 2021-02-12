import React from 'react';
import styles from './RandomItemsMenu.module.scss';
import { NavLink } from 'react-router-dom';

export const RandomItemsMenuDom = ({ randomItems, openAnimationInfo }) => {
  return (
    <>
      {
        randomItems && Object.keys(randomItems).map((item, i) => {
          const listName = item === 'animation' ? 'animation' : 'manga';
          return (
            <div className={styles.wrapper} key={i}>
              <NavLink to={`/description/${item}/${randomItems[item][`${listName}Id`]}`}
                onClick={() => openAnimationInfo(listName, randomItems[item][`${listName}Id`])}
                className={styles.animationItem} >
                <img src={`https://anime.amyasnikov.pro/${listName}_small/${listName}_cover_${randomItems[item][`${listName}Id`]}_small.jpg`}
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