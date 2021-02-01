import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from '../Search/Search';
import styles from './Header.module.scss'

export const Header = ({ menuItems }) => {
  return (
    <div className={styles.wrapper}>
      {
        menuItems.map((el, i) => {
          return (
              <NavLink to={el.link} key={i} className={styles.item}>{el.item}</NavLink>
          )
        })
      }
      <Search />
    </div>
  )
}