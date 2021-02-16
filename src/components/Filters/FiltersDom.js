import React from 'react';
import styles from './Filters.module.scss';
import Dropdown from '../Dropdown/Dropdown';
import FilterCurrent from '../FilterCurrent/FilterCurrent';

export const FiltersDom = ({ buttonsFilter, dropdowns, isMobile }) => {
  if (!isMobile) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          Фильтры:
        </div>
        <div className={styles.currentFilters}>
          <FilterCurrent />
        </div>
        <div className={styles.dropdownsWrap}>
          {
            dropdowns.map((dropdown, j) => {
              if (!buttonsFilter[dropdown.type]) return <div key={j}></div>
              return (
                <div className={styles.dropdown} key={j}>
                  <Dropdown dropdown={dropdown} items={buttonsFilter[dropdown.type]} />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  } else if (isMobile) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.dropdownsMobile}>
          <div className={styles.dropdownsWrap}>
            {
              dropdowns.map((dropdown, j) => {
                const dropdownType = dropdown.type;
                if (!buttonsFilter[dropdownType]) return <div key={j}></div>
                return (
                  <div className={styles.dropdown} key={j}>
                    <Dropdown dropdown={dropdown} items={buttonsFilter[dropdown.type]} />
                  </div>
                )
              })
            }
          </div>
          {<div className={styles.currentFilters}>
            <FilterCurrent />
          </div>}
        </div>
      </div>
    )
  }
}