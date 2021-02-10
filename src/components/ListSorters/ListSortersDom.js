import React from 'react';
import styles from './ListSorters.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

export const ListSortersDom = ({ buttonsSort, sortHandler, showDropdownFunc, showDropdowns }) => {
  return (
    <div className={styles.wrapper}>
      <div className={classnames(styles.button, styles.sortBy)}>
        Сортировать по:
        </div>
      {
        buttonsSort.map((el, i) => {
          return (
            <div className={classnames(styles.button, {[styles.hover]: showDropdowns[i]})} key={i} 
              onMouseOver={() => showDropdownFunc(i, true)}
              onMouseLeave={() => showDropdownFunc(i, false)}>
              <NavLink to={`/animation/list/1`} className={classnames({ [styles.reverse]: el.subButtons[1].active })}>
                {
                  el.subButtons.map((item, j) => {
                    return (
                      <div className={classnames(styles.subButton, { [styles.active]: item.active })} key={j}
                        onClick={() => sortHandler(el.id, item.id, item.sort)}>
                        {item.text}
                      </div>
                    )
                  })
                }
              </NavLink>

            </div>
          )
        })
      }
    </div>
  )
}