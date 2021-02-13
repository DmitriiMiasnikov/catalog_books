import React from 'react';
import styles from './ScrollItems.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import angleLeft from './../../assets/Images/angle-circle-arrow-left.svg';
import angleRight from './../../assets/Images/angle-circle-arrow-right.svg';

export const ScrollItemsDom = ({ openInfo, items, buttonScrollHandler, scrollPosition, name }) => {
  return (
    <div className={styles.wrapper}>
      {
        items && items.length && scrollPosition && <>
          <div className={classnames(styles.buttonLeft)} >
            <img src={angleLeft} alt='' onClick={() => buttonScrollHandler('left')}
              className={classnames({ [styles.disabled]: scrollPosition.left <= 0 })} />
          </div>
          <div className={styles.scrollBlock}>
            <div className={styles.listWrap} style={{ left: 0, transform: `translateX(-${scrollPosition.scroll}px)` }}>
              {
                items.map((el, i) => {
                  const id = `${name}Id`;
                  return (
                    <NavLink to={`description/${name}/${el[id]}`} onClick={() => openInfo(el[id])}
                      className={styles.item} key={i} >
                      <img src={`https://anime.amyasnikov.pro/${name}_small/${name}_cover_${el[id]}_small.jpg`}
                        alt='img' className={styles.image} />
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
              className={classnames({ [styles.disabled]: scrollPosition.right <= 0 })} />
          </div>
        </>
      }
      {
        items && !items.length && (
          <div className={styles.noItems}>
            список пуст
          </div>
        )
      }
    </div>
  )
}