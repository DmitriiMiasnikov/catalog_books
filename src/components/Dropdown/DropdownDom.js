import React from 'react';
import styles from './Dropdown.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

export const DropdownDom = ({ dropdown, openDropdown, buttonsFilter, filterHandler, listName }) => {
  return (
    <div className={styles.wrapper}>
      <div className={classnames(styles.dropdown, { [styles.closed]: dropdown.closed })}>
        <div className={styles.button} onClick={() => openDropdown(dropdown.id)}>
          {dropdown.text}:  {dropdown.closed ? <div>&#9660;</div> : <div>&#9650;</div>}
        </div>
        <div className={styles.dropdownBlock}
          style={{
            height: dropdown.closed || !Object.keys(buttonsFilter).length ? 0 :
              buttonsFilter[dropdown.type].length * 30 + 20
          }}>
          {
            Object.keys(buttonsFilter).length ? buttonsFilter[dropdown.type].map((el, i) => {
              return (
                <div className={classnames(styles.dropdownButton, { [styles.active]: el.active })}
                  key={i} onClick={() => filterHandler(dropdown.type, el[dropdown.type], i)} >
                  <NavLink to={`/list/${listName}/1`}>
                    {el[dropdown.type]}
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