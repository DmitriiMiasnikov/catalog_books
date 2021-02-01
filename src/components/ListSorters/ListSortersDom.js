import React from 'react';
import styles from './ListSorters.module.scss';
import classnames from 'classnames';
import arrow from './../../assets/Images/arrow.svg';

export const ListSortersDom = ({ buttonsSort, sortHandler }) => {
  return (
    <div className={styles.wrapper}>
      <div className={classnames(styles.button, styles.sortBy)}>
        Сортировать по:
        </div>
      {
        buttonsSort.map((el, i) => {
          return (
            <div className={classnames(styles.button, { [styles.active]: el.active })}
              onClick={() => sortHandler(el.id, el.sort)} key={i}>
              <div className={styles.text}>{el.text}</div>
              <img src={arrow} alt='arrow' className={classnames(styles.arrow, { [styles.reverse]: el.direction !== 'direct' })} />
            </div>
          )
        })
      }
    </div>
  )
}