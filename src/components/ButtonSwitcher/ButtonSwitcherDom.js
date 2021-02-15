import React from 'react';
import styles from './ButtonSwitcher.module.scss';
import classnames from 'classnames';

export const ButtonSwitcherDom = ({ userInfoLists, currentUserId, userInfoListsHandler, 
  buttonsControl }) => {
  return (
    <div className={styles.wrapper}>
      {userInfoLists && currentUserId && <div className={styles.buttons}>
        <div className={styles.buttonsControl}>
          {
            buttonsControl.map((el, i) => {
              return (
                <div key={i} className={classnames(styles.button, { [styles.added]: userInfoLists[el.type] })}
                  onClick={() => userInfoListsHandler(el.type)}>
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