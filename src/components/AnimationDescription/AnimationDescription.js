import React from 'react';
import styles from './AnimationDescription.module.scss';

export const AnimationDescription = ({ currentAnimationInfo }) => {
  return (
    <div className={styles.wrapper}>
      {currentAnimationInfo && currentAnimationInfo.nameRu}
    </div>
  )
}