import React from 'react';
import styles from './ScrollItems.module.scss';
import classnames from 'classnames';
import angleLeft from './../../assets/Images/angle-circle-arrow-left.svg';
import angleRight from './../../assets/Images/angle-circle-arrow-right.svg';
import ListItem from './../ListItem/ListItem';

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
                  return (<div className={styles.item} key={i}>
                    <ListItem view={'tile'} listName={name} item={el} />
                  </div>)
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