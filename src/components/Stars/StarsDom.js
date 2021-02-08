import React from 'react';
import styles from './Stars.module.scss';
import classnames from 'classnames';

export const StarsDom = ({ userInfoAnimation, userInfoAnimationHandler, currentUserId }) => {
  return (
    <div className={styles.wrapper}>
        {userInfoAnimation && currentUserId && (
          <div className={classnames(styles.star, { [styles.added]: userInfoAnimation['selected'] })}
          onClick={() => userInfoAnimationHandler('selected')}>
          {userInfoAnimation['selected'] ? <span>&#9733;</span> : <span>&#9734;</span>}
        </div>
        )}
    </div>
  )
}