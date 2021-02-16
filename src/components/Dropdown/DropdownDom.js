import React, { useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

export const DropdownDom = ({ dropdownState, openDropdown, itemsState, filterHandler, listName }) => {
  const refDropdown = useRef(null);
  const handleMouseClick = (e) => {
    if (!e.path.includes(refDropdown.current)) {
      openDropdown(-1);
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleMouseClick, true)
    return () => document.removeEventListener('click', handleMouseClick, true)
  })
  return (
    <div className={styles.wrapper} ref={refDropdown}>
      <div className={classnames(styles.dropdown, { [styles.closed]: dropdownState.closed })}>
        <div className={styles.button} onClick={() => openDropdown(dropdownState.id)}>
          {dropdownState.text}:  {dropdownState.closed ? <div>&#9660;</div> : <div>&#9650;</div>}
        </div>
        <div className={styles.dropdownBlock}
          style={{ height: dropdownState.closed || !itemsState.length ? 0 : itemsState.length * 30 + 20 }}>
          {
            itemsState.length ? itemsState.map((el, i) => {
              return (
                <div className={classnames(styles.dropdownButton, { [styles.active]: el.active })}
                  key={i} onClick={() => filterHandler(el[dropdownState.type], i)} >
                  <NavLink to={`/list/${listName}/1`}>
                    {el[dropdownState.type]}
                  </NavLink>
                </div>
              )
            }) : null
          }
        </div>
      </div>
    </div>
  )
}