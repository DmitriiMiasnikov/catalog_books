import React from 'react';
import styles from './Main.module.scss';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import angleLeft from './../../assets/Images/angle-circle-arrow-left.svg';
import angleRight from './../../assets/Images/angle-circle-arrow-right.svg';

export const MainDom = ({ fetching, openAnimationInfo, lastViewed, buttonScrollHandler, scrollViewed }) => {
  return (
    <div className={styles.wrapper}>
      {
        !fetching && lastViewed && Boolean(lastViewed.length) && (
          <div className={styles.lastViewed}>
            <div className={styles.title}>
              Последние просмотренные
            </div>
            <div className={styles.lastViewedWrap}>
              <div className={classnames(styles.buttonLeft)} >
                <img src={angleLeft} alt='' onClick={() => buttonScrollHandler('left')}
                  className={classnames({ [styles.disabled]: !scrollViewed.left })} />
              </div>
              <div className={styles.scrollBlock}>
                <div className={styles.animationListWrap} style={{ left: 0, transform: `translateX(-${scrollViewed.scroll}px)` }}>
                  {
                    lastViewed.map((el, i) => {
                      return (
                        <NavLink to={`/animation/id/${el.animationId}`} onClick={() => openAnimationInfo('animation', el.animationId)}
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
              <div className={classnames(styles.buttonRight)} >
                <img src={angleRight} alt='' onClick={() => buttonScrollHandler('right')}
                  className={classnames({ [styles.disabled]: !scrollViewed.right })} />
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}