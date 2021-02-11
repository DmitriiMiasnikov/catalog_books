import React from 'react';
import styles from './Main.module.scss';
import { NavLink } from 'react-router-dom';

export const MainDom = ({ fetching, openAnimationInfo, lastViewed }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        Последние просмотренные
      </div>
      {
        !fetching && lastViewed && Boolean(lastViewed.length) && (
          <div className={styles.lastViewedWrap}>
            <div className={styles.buttonLeft}>
              asad
            </div>
            <div className={styles.scrollBlock}>
              <div className={styles.animationListWrap} style={{ left: 0 }}>
                {
                  lastViewed.map((el, i) => {
                    return (
                      <NavLink to={`/animation/id/${el.animationId}`} onClick={() => openAnimationInfo(el.animationId)}
                        className={styles.animationItem} key={i} >
                        <img src={`https://anime.amyasnikov.pro/images/animation_cover_${el.animationId}.jpg`} alt='img'
                          className={styles.image} />
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
                  })
                }
              </div>
            </div>
            <div className={styles.buttonRight}>
              asad
        </div>
          </div>
        )
      }
    </div>
  )
}