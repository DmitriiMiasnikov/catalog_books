import React from 'react';
import styles from './Filters.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import close from './../../assets/Images/close.svg';
import Dropdown from '../Dropdown/Dropdown';

export const FiltersDom = ({ buttonsFilter, dropdowns, filterHandler, selectedUser,
  userInfo, closeUsersList, filterBy, searchValue, cancelSeach, isMobile }) => {
  return (
    <div className={styles.wrapper}>
      {
        isMobile && (<div className={styles.dropdownsMobile}>
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
            {Boolean(selectedUser) && <div className={classnames(styles.filter, styles.userFilter)}>
              <NavLink className={styles.name} to={`/users/${userInfo.userId}`}>
                {userInfo.userName}
              </NavLink>
              <img src={close} className={styles.cancelButton} onClick={() => closeUsersList()} alt='' />
            </div>}
            {searchValue && <div className={classnames(styles.searchItem, styles.filter, { [styles.hide]: !searchValue })}>
              <span>"{searchValue}"</span>
              <img src={close} alt='close' className={styles.cancelButton} onClick={() => cancelSeach()} />
            </div>}
            {filterBy !== 'все' && <div className={classnames(styles.filter, styles.currentFilter)}>
              <div className={styles.text}>
                {filterBy}
              </div>
              <img src={close} className={styles.cancelButton}
                onClick={() => filterHandler(dropdowns[0].type, 'все', 0)} alt='' />
            </div>}
          </div>}
        </div>)
      }
      {
        !isMobile && <>
          <div className={styles.title}>
            Фильтры:
          </div>
          <div className={styles.currentFilters}>
            {Boolean(selectedUser) && <div className={classnames(styles.filter, styles.userFilter)}>
              <NavLink className={styles.name} to={`/users/${userInfo.userId}`}>
                {userInfo.userName}
              </NavLink>
              <img src={close} className={styles.cancelButton} onClick={() => closeUsersList()} alt='' />
            </div>}
            {searchValue && <div className={classnames(styles.searchItem, styles.filter, { [styles.hide]: !searchValue })}>
              <span>"{searchValue}"</span>
              <img src={close} alt='close' className={styles.cancelButton} onClick={() => cancelSeach()} />
            </div>}
            {filterBy !== 'все' && <div className={classnames(styles.filter, styles.currentFilter)}>
              <div className={styles.text}>
                {filterBy}
              </div>
              <img src={close} className={styles.cancelButton}
                onClick={() => filterHandler(dropdowns[0].type, 'все', 0)} alt='' />
            </div>}
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
        </>
      }
    </div>
  )
}