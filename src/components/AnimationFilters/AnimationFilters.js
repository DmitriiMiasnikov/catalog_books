import React, { useRef, useEffect } from 'react';
import styles from './AnimationFilters.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import close from './../../assets/Images/close.svg';

export const AnimationFilters = ({ buttonsFilter, openDropdown, dropdowns, filterHandler, selectedUser,
  userInfo, closeUsersList }) => {
  const refDropdown = useRef(null);
  const handleMouseClick = (e) => {
    if (!e.path.includes(refDropdown.current)) {
      openDropdown(-1);
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleMouseClick, true)
  })
  useEffect(() => {
    return () => document.removeEventListener('click', handleMouseClick, true)
  })
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        Фильтры:
      </div>
      <div className={styles.currentFilters}>
        {Boolean(selectedUser) && <div className={styles.listOwnerBlock}>
          <NavLink className={styles.name} to={`/users/${userInfo.userId}`}>
            {userInfo.userName}
          </NavLink>
          <img src={close} className={styles.cancelButton} onClick={() => closeUsersList()} alt='' />
        </div>}
        {<div>
        </div>}
      </div>
      <div className={styles.dropdownsWrap} ref={refDropdown}>
        {
          dropdowns.map((dropdown, j) => {
            const dropdownType = dropdown.type;
            return (
              <div key={j} className={classnames(styles.dropdown, { [styles.closed]: dropdown.closed })}>
                <div className={styles.button} onClick={() => openDropdown(dropdown.id)}>
                  {dropdown.text}:  {dropdown.closed ? <div>&#9660;</div> : <div>&#9650;</div>}
                </div>
                <div className={styles.dropdownBlock}
                  style={{ height: dropdown.closed ? 0 : buttonsFilter[dropdownType].length * 30 + 20 }}>
                  {
                    Object.keys(buttonsFilter).length ? buttonsFilter[dropdownType].map((el, i) => {
                      return (
                        <div className={classnames(styles.dropdownButton, { [styles.active]: el.active })}
                          key={i} onClick={() => filterHandler(dropdownType, el[dropdownType], i)} >
                          <NavLink to={`/animation/list/1`}>
                            {el[dropdownType]}
                          </NavLink>
                        </div>
                      )
                    }) : null
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}