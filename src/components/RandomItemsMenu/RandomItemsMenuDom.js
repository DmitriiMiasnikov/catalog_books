import React from 'react';
import styles from './RandomItemsMenu.module.scss';
import { NavLink } from 'react-router-dom';
import ListItem from './../ListItem/ListItem';

export const RandomItemsMenuDom = ({ randomItems }) => {
  return (
    <>
      {
        randomItems && Object.keys(randomItems).map((item, i) => {
          return (
            <div className={styles.wrapper} key={i}>
              <ListItem view={'tile'} listName={item} item={randomItems[item]} />
            </div>
          )
        })

      }
    </>
  )
}