import React from 'react';
import styles from './AnimationFilters.module.scss';
import classnames from 'classnames';

export const AnimationFilters = ({ buttonsFilter, openDropdown, dropdowns, filterHandler }) => {
  return (
    <div className={styles.wrapper}>
      {
        dropdowns.map((dropdown, j) => {
          return (
            <div key={j} className={classnames(styles.dropdown, { [styles.closed]: dropdown.closed })}>
              <div className={styles.button} onClick={() => openDropdown(dropdown.id)}>
                {dropdown.text}:
            </div>
              <div className={styles.dropdownBlock}>
                {
                  buttonsFilter && buttonsFilter.map((el, i) => {
                    return (
                      <div className={styles.dropdownButton} key={i} onClick={() => filterHandler(el)}>
                        {el}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}