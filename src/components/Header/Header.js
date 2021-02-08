import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from '../Search/Search';
import styles from './Header.module.scss';
import home from './../../assets/Images/home.svg';

export const Header = ({ menuItems }) => {
  return (
    <div className={styles.wrapper}>
      {
        menuItems.map((el, i) => {
          return (
              <NavLink to={el.link} key={i} className={styles.item}>
                {i === 0 ? <img src={home} /> : el.item}
              </NavLink>
          )
        })
      }
      <Search />
    </div>
  )
}