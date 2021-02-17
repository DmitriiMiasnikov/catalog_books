import React, { useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import angle from './../../assets/Images/angle.svg';

export const DropdownDom = ({ dropdownState, openDropdown, itemsState, filterHandler, listName, isMobile }) => {
  const refDropdown = useRef(null);
  const handleMouseClick = (e) => {
    function composedPath(el) {
      const path = [];
      while (el) {
        path.push(el);
        if (el.tagName === 'HTML') {
          path.push(document);
          path.push(window);
          return path;
        }
        el = el.parentElement;
      }
    }
    const path = e.path || (e.composedPath && e.composedPath()) || composedPath(e.target);
    if (!path.includes(refDropdown.current)) {
      openDropdown(-1);
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleMouseClick, true)
    return () => document.removeEventListener('click', handleMouseClick, true)
  })
  if (!isMobile) {
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
  } else if (isMobile) {
    return (
      <div className={styles.wrapper} ref={refDropdown}>
        <div className={classnames(styles.dropdown, { [styles.closed]: dropdownState.closed })}>
          <div className={styles.button} onClick={() => openDropdown(dropdownState.id)}>
            <span>{dropdownState.text}:</span>{<img src={angle} className={classnames(styles.angle, {
              [styles.reverse]: !dropdownState.closed
            })} alt='' />}
          </div>
          <div className={styles.dropdownBlock}
            style={{
              height: dropdownState.closed || !itemsState.length ? 0 :
              itemsState.length * 30 + 20
            }}>
            {
              itemsState.length ?itemsState.map((el, i) => {
                return (
                  <div className={classnames(styles.dropdownButton, { [styles.active]: el.active })}
                    key={i} onClick={() => {filterHandler(el[dropdownState.type], i); openDropdown(-1)}} >
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

}