import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchContainer from '../Search/SearchContainer';
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
      <SearchContainer />
    </div>
  )
}