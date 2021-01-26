import React from 'react';
import styles from './Animation.module.scss';

export const Animation = ({ animation }) => {
  console.log(animation);
  return (
    <div className={styles.wrapper}>
      {
        animation && animation.map((el, i) => {
          return (
            <div key={i} className={styles.animation}>
              {el.nameRu}
            </div>
          )
        })
      }
    </div>
  )
}