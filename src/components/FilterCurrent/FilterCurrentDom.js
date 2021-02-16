import React from 'react';
import styles from './FilterCurrent.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import close from './../../assets/Images/close.svg';

export const FilterCurrentDom = ({ selectedUser, userInfo, closeUsersList, searchValue, cancelSeach,
  filterBy, cancelFilter }) => {
  return (
    <div className={styles.wrapper}>
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
          onClick={() => cancelFilter()} alt=''/>
      </div>}
    </div>
  )
}