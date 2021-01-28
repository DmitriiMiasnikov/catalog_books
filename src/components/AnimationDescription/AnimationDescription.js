import React from 'react';
import styles from './AnimationDescription.module.scss';

export const AnimationDescription = ({ selectedAnimation }) => {
  return (
    <div className={styles.wrapper}>
      {selectedAnimation && selectedAnimation.nameRu}
    </div>
  )
}