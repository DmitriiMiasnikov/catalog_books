import React from 'react';
import styles from './UserControlPanel.module.scss';
import classnames from 'classnames';

export const UserControlPanelDom = ({ userInfoAnimation, currentUserId, userInfoAnimationHandler, 
  buttonsControl }) => {
    console.log(userInfoAnimation, currentUserId);
  return (
    <div className={styles.wrapper}>
      {userInfoAnimation && currentUserId && <div className={styles.buttons}>
        <div className={classnames(styles.star, { [styles.added]: userInfoAnimation['selected'] })}
          onClick={() => userInfoAnimationHandler('selected')}>
          {userInfoAnimation['selected'] ? <span>&#9733;</span> : <span>&#9734;</span>}
        </div>
        <div className={styles.buttonsControl}>
          {
            buttonsControl.map((el, i) => {
              return (
                <div key={i} className={classnames(styles.button, { [styles.added]: userInfoAnimation[el.type] })}
                  onClick={() => userInfoAnimationHandler(el.type)}>
                  {el.text}
                </div>
              )
            })
          }
        </div>
      </div>}
    </div>
  )
}