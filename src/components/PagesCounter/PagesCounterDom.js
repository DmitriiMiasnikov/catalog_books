import React from 'react';
import styles from './PagesCounter.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

export const PagesCounterDom = ({ openPage, switchCounter, pagesButtons, countInPage, currentPage, countAll,
  buttonsSwitchCounter, parametres }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageButtonsWrap}>
        {
          pagesButtons.map((el, i) => {
            return (
              <div key={i} onClick={() => openPage(el.page)}
                className={classnames(styles.pageButton, { [styles.active]: el.active })}>
                <NavLink to={`/animation/list/${el.page}${parametres}`}>
                  {el.page}
                  {i === pagesButtons.length - 1 && <div className={styles.pagesCounter}>
                    {countInPage * currentPage - (countInPage - 1)}-{countAll < (countInPage * currentPage) ?
                      countAll : (countInPage * currentPage)} из {countAll}
                  </div>
                  }
                </NavLink>
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
                <NavLink to={`/animation/list/1?countBy=${el.counter}`}>
                  {el.counter}
                </NavLink>
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