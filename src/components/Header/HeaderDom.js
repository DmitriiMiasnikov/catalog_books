import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from '../Search/Search';
import styles from './Header.module.scss';
import home from './../../assets/Images/home.svg';
import menu from './../../assets/Images/menu.svg';
import classnames from 'classnames';
import UserMenu from '../UserMenu/UserMenu';

export const HeaderDom = ({ menuItems, animationItems, showAnimation, showAnimationHandler,
  openListAnimationFiltered, clearListHandler, isMobile }) => {
  return (
    <div className={styles.wrapper}>
      {
        menuItems.map((el, i) => {
          return (
            <div className={styles.item} key={i} onMouseOver={() => showAnimationHandler(el.page, true)}
              onMouseLeave={() => showAnimationHandler(el.page, false)} onClick={() => showAnimationHandler(el.page, false)}>
              <NavLink to={el.link} className={styles.link} onClick={() => clearListHandler(el.list)}>
                {el.page === 'mainPage' ? <img src={home} alt='' className={styles.homeImg} /> : el.item}
                {el.page === 'animationListPage' && <img src={menu} alt='' className={styles.menuImg} />}
              </NavLink>
              {el.page === 'animationListPage' && (
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
      <div className={styles.rightBlock}>
        <div className={styles.search}>
          <Search />
        </div>
        <div className={styles.userMenu}>
          {isMobile && <UserMenu />}
        </div>
      </div>
    </div>
  )
}