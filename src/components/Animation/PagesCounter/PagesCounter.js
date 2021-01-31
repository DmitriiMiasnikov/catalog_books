import React from 'react';
import styles from './PagesCounter.module.scss';
import classnames from 'classnames';

export const PagesCounter = ({ openPage, switchCounter, pagesButtons, countInPage, currentPage, countAllAnimation,
  buttonsSwitchCounter }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageButtonsWrap}>
        {
          pagesButtons.map((el, i) => {
            return (
              <div key={i} onClick={() => openPage(el.page)}
                className={classnames(styles.pageButton, { [styles.active]: el.active })}>
                {el.page}
                {i === pagesButtons.length - 1 && <div className={styles.pagesCounter}>
                  {countInPage * currentPage - (countInPage - 1)}-{countAllAnimation < (countInPage * currentPage) ?
                    countAllAnimation : (countInPage * currentPage)} из {countAllAnimation}
                </div>
                }
              </div>
            )
          })
        }
      </div>
      <div className={styles.buttonSwitchCounter}>
        {
          buttonsSwitchCounter.map((el, i) => {
            return (
              <div key={i} onClick={() => switchCounter(el.counter, el.id)}
                className={classnames(styles.button, { [styles.active]: el.active })}>
                {el.counter}
              </div>
            )
          })
        }
        <div className={styles.text}>
          Показывать по:
      </div>
      </div>
    </div>
  )
}