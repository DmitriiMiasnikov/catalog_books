import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from '../Search/Search';
import styles from './Header.module.scss';
import home from './../../assets/Images/home.svg';
import classnames from 'classnames';

export const HeaderDom = ({ menuItems, animationItems, showAnimation, showAnimationHandler,
  openListAnimationFiltered }) => {
  return (
    <div className={styles.wrapper}>
      {
        menuItems.map((el, i) => {
          return (
            <div className={styles.item} key={i} onMouseOver={() => showAnimationHandler(i, true)}
              onMouseLeave={() => showAnimationHandler(i, false)} onClick={() => showAnimationHandler(i, false)}>
              <NavLink to={el.link} className={styles.link}>
                {i === 0 ? <img src={home} alt='' /> : el.item}
              </NavLink>
              {i === 2 && (
                <div className={classnames(styles.dropdownWrap, { [styles.visible]: showAnimation })}>
                  {animationItems.map((item, j) => {
                    return (
                      <div className={styles.dropdown} key={j} onClick={() => openListAnimationFiltered(item)}>
                        {item}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })
      }
      <Search />
    </div>
  )
}