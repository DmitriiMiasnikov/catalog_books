import React from 'react';
import styles from './Main.module.scss';
import ScrollItems from './../ScrollItems/ScrollItems';
import loading from './../../assets/Images/loading.svg';

export const MainDom = ({ fetching, lastViewed, listNames, currentUserId }) => {
  return (
    <div className={styles.wrapper}>
      {currentUserId && <div className={styles.title}>
        Последнее просмотренное
      </div>}
      {
        currentUserId && listNames.map((listName, index) => {
          return (
            <div key={index} className={styles.lastViewed}>
              {!fetching && lastViewed && <ScrollItems name={listName.name} items={lastViewed[listName.name]} title={listName.text} />}
              {fetching && <div className={styles.loading}>
                <img src={loading} alt='' />
              </div>}
            </div>
          )
        })
      }
    </div>
  )
}