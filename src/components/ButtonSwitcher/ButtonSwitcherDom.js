import React from 'react';
import styles from './ButtonSwitcher.module.scss';
import classnames from 'classnames';

export const ButtonSwitcherDom = ({ userInfoLists, currentUserId, userInfoListsHandler,
  buttonsControl }) => {
  return (
    <>
      {userInfoLists && currentUserId && <div className={classnames(styles.wrapper,
        { [styles.noChoose]: Object.keys(userInfoLists).every(el => !userInfoLists[el]) })}>
        {
          Object.keys(userInfoLists).every(el => !userInfoLists[el]) && buttonsControl.map((el, i) => {
            return (
              <div key={i} className={classnames(styles.button, { [styles.added]: userInfoLists[el.type] })}
                onClick={() => userInfoListsHandler(el.type)}>
                {el.text}
              </div>
            )
          })
        }
        {
          Object.keys(userInfoLists).some(el => userInfoLists[el]) && buttonsControl.map((el, i) => {
            if (!userInfoLists[el.type]) return
            return (
              <div key={i} className={classnames(styles.button, styles[el.type], { [styles.added]: userInfoLists[el.type] })}
                onClick={() => userInfoListsHandler(el.type)}>
                {el.textDone}
              </div>
            )
          })
        }
      </div>}
    </>
  )
}