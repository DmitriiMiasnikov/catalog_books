import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss'

export const Header = ({ menuItems }) => {
  return (
    <div className={styles.wrapper}>
      {
        menuItems.map((el, i) => {
          return (
            <div key={i} className={styles.item}>
              <NavLink to={el.link}>{el.item}</NavLink>
              </div>
          )
        })
      }
    </div>
  )
}