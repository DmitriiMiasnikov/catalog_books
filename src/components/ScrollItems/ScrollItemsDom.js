import React from 'react';
import styles from './ScrollItems.module.scss';
import classnames from 'classnames';
import angle from './../../assets/Images/angle.svg';
import ListItem from './../ListItem/ListItem';

export const ScrollItemsDom = ({ items, buttonScrollHandler, scrollPosition, name, title }) => {
  return (
    <>
      {
        items && items.length && <div className={classnames(styles.wrapper, { [styles.withTitle]: title })}>
          <div className={classnames(styles.buttonLeft)}
            onClick={() => buttonScrollHandler('left')}>
            <img src={angle} alt='' />
            {title && <div className={styles.title}>
              {title}
            </div>}
          </div>
          <div className={styles.scrollBlock}>
            <div className={styles.listWrap} style={{ left: 0, transform: `translateX(-${scrollPosition}px)` }}>
              {
                items.map((el, i) => {
                  return (<div className={styles.item} key={i}>
                    <ListItem view={'tile'} listName={name} item={el} descriptionOnHover={false}/>
                  </div>)
                })
              }
            </div>
          </div>
          <div className={classnames(styles.buttonRight)}
            onClick={() => buttonScrollHandler('right')}>
            <img src={angle} alt='' />
          </div>
        </div>
      }
      {
        items && !items.length && (
          <div className={styles.noItems}>
            список пуст
          </div>
        )
      }
    </>
  )
}