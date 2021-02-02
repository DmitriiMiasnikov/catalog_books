import React from 'react';
import styles from './PageView.module.scss';
import classnames from 'classnames';

export const PageViewDom = ({ pageViewButtons, pageViewHandler }) => {
  return (
    <div className={styles.wrapper}>
    {
      pageViewButtons.map((el, i) => {
        return (
          <div className={classnames(styles.pageViewButton, styles[el.type], {[styles.active]: el.active})} key={i}
            onClick={() => pageViewHandler(el.type, el.id)}>
              {el.type === 'small' && [0,1,2,3].map((item, j) => <div key={j} className={styles.pageViewItem}></div>)}
              {el.type === 'medium' && [0,1].map((item, j) => <div key={j} className={styles.pageViewItem}></div>)}
              {el.type === 'large' && [0,1,3,4].map((item, j) => <div key={j} className={styles.pageViewItem}></div>)}
      
          </div>
        )
      })
    }
  </div>
  )
}