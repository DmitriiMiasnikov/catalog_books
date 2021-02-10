import React from 'react';
import styles from './RandomAnimationMenu.module.scss';

export const RandomAnimationMenuDom = ({ randomAnimation }) => {
  return (
    <>
    {
      randomAnimation && <div className={styles.wrapper}>
        {'asd'}
      </div>
    }
    </>
  )
}