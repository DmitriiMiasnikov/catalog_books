import React from 'react';
import styles from './ButtonSwitcher.module.scss';
import classnames from 'classnames';

export const ButtonSwitcherDom = ({ userInfoAnimation, currentUserId, userInfoAnimationHandler, 
  buttonsControl }) => {
  return (
    <div className={styles.wrapper}>
      {userInfoAnimation && currentUserId && <div className={styles.buttons}>
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