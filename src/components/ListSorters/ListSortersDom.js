import React, { useRef, useEffect } from 'react';
import styles from './ListSorters.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import angle from './../../assets/Images/angle.svg';

export const ListSortersDom = ({ buttonsSort, sortHandler, showDropdownFunc, showDropdowns, listName, isMobileLess,
  showButtonsSortHandler, showButtonsSort }) => {
    const refButtonSortBy = useRef(null);
    const handleMouseClickSort = (e) => {
      if (!e.path.includes(refButtonSortBy.current)) {
        showButtonsSortHandler(false);
      }
    }
    useEffect(() => {
      document.addEventListener('click', handleMouseClickSort, false)
      return () => document.removeEventListener('click', handleMouseClickSort, false)
    })
  return (
    <>
      {isMobileLess && (
        <div className={styles.wrapper}>
          <div className={classnames(styles.button, styles.sortBy, { [styles.buttonShowSorters]: isMobileLess })}
            onClick={() => showButtonsSortHandler()} ref={refButtonSortBy}>
            Сортировать по: {<img src={angle} className={classnames(styles.angle, {
                    [styles.reverse]: !showButtonsSort
                  })} alt='' />}
            </div>
          {
            showButtonsSort && buttonsSort.map((el, i) => {
              return (
                <div className={classnames(styles.button)} key={i} onMouseOver={() => showDropdownFunc(i, true)} 
                  style={{ height: showDropdowns[i] && 32 * el.subButtons.length }} onMouseLeave={() => showDropdownFunc(i, false)}>
                  <NavLink to={`/list/${listName}/1`} className={classnames({ [styles.reverse]: !el.subButtons[0].active })}>
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
      )}
      {!isMobileLess && (
        <div className={styles.wrapper}>
          <div className={classnames(styles.button, styles.sortBy)}>
            Сортировать по:
            </div>
          {
            buttonsSort.map((el, i) => {
              return (
                <div className={classnames(styles.button)} key={i} style={{ height: showDropdowns[i] && 32 * el.subButtons.length }} 
                  onMouseOver={() => showDropdownFunc(i, true)} onMouseLeave={() => showDropdownFunc(i, false)}>
                  <NavLink to={`/list/${listName}/1`} className={classnames({ [styles.reverse]: !el.subButtons[0].active })}>
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
      )}
    </>
  )
}