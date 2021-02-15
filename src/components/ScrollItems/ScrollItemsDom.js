import React from 'react';
import styles from './ScrollItems.module.scss';
import classnames from 'classnames';
import angle from './../../assets/Images/angle.svg';
import ListItem from './../ListItem/ListItem';

export const ScrollItemsDom = ({ items, buttonScrollHandler, scrollPosition, name }) => {
  return (
    <div className={styles.wrapper}>
      {
        items && items.length && <>
          <div className={classnames(styles.buttonLeft)}
            onClick={() => buttonScrollHandler('left')}>
            <img src={angle} alt='' />
          </div>
          <div className={styles.scrollBlock}>
            <div className={styles.listWrap} style={{ left: 0, transform: `translateX(-${scrollPosition}px)` }}>
              {
                items.map((el, i) => {
                  return (<div className={styles.item} key={i}>
                    <ListItem view={'tile'} listName={name} item={el} />
                  </div>)
                })
              }
            </div>
          </div>
          <div className={classnames(styles.buttonRight)}
            onClick={() => buttonScrollHandler('right')}>
            <img src={angle} alt='' />
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