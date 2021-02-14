import React, { useRef, useEffect } from 'react';
import styles from './Filters.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import close from './../../assets/Images/close.svg';
import angle from './../../assets/Images/angle.svg';

export const FiltersDom = ({ buttonsFilter, openDropdown, dropdowns, filterHandler, selectedUser,
  userInfo, closeUsersList, filterBy, searchValue, cancelSeach, listName, isMobile }) => {
    console.log(isMobile);
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
      {
        isMobile && (<div className={styles.dropdownsMobile}>
            <div className={styles.dropdownsWrap} ref={refDropdown}>
              {
                dropdowns.map((dropdown, j) => {
                  const dropdownType = dropdown.type;
                  if (!buttonsFilter[dropdownType]) return <div key={j}></div>
                  return (
                    <div key={j} className={classnames(styles.dropdown, { [styles.closed]: dropdown.closed })}>
                      <div className={styles.button} onClick={() => openDropdown(dropdown.id)}>
                        <span>{dropdown.text}:</span>{<img src={angle} className={classnames(styles.angle, {
                    [styles.reverse]: !dropdown.closed
                  })} alt='' />}
                      </div>
                      <div className={styles.dropdownBlock}
                        style={{
                          height: dropdown.closed || !Object.keys(buttonsFilter).length ? 0 :
                            buttonsFilter[dropdownType].length * 30 + 20
                        }}>
                        {
                          Object.keys(buttonsFilter).length ? buttonsFilter[dropdownType].map((el, i) => {
                            return (
                              <div className={classnames(styles.dropdownButton, { [styles.active]: el.active })}
                                key={i} onClick={() => filterHandler(dropdownType, el[dropdownType], i)} >
                                <NavLink to={`/list/${listName}/1`}>
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
          <div className={styles.dropdownsWrap} ref={refDropdown}>
            {
              dropdowns.map((dropdown, j) => {
                const dropdownType = dropdown.type;
                if (!buttonsFilter[dropdownType]) return <div key={j}></div>
                return (
                  <div key={j} className={classnames(styles.dropdown, { [styles.closed]: dropdown.closed })}>
                    <div className={styles.button} onClick={() => openDropdown(dropdown.id)}>
                      {dropdown.text}:  {dropdown.closed ? <div>&#9660;</div> : <div>&#9650;</div>}
                    </div>
                    <div className={styles.dropdownBlock}
                      style={{
                        height: dropdown.closed || !Object.keys(buttonsFilter).length ? 0 :
                          buttonsFilter[dropdownType].length * 30 + 20
                      }}>
                      {
                        Object.keys(buttonsFilter).length ? buttonsFilter[dropdownType].map((el, i) => {
                          return (
                            <div className={classnames(styles.dropdownButton, { [styles.active]: el.active })}
                              key={i} onClick={() => filterHandler(dropdownType, el[dropdownType], i)} >
                              <NavLink to={`/list/${listName}/1`}>
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
        </>
      }
    </div>
  )
}