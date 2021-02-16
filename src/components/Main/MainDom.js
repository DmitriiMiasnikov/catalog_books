import React from 'react';
import styles from './Main.module.scss';
import ScrollItems from './../ScrollItems/ScrollItems';
import loading from './../../assets/Images/loading.svg';

export const MainDom = ({ fetching, lastViewed, listNames, currentUserId, randomItemsByGenre }) => {
  return (
    <div className={styles.wrapper}>
      {randomItemsByGenre && <div className={styles.title}>
        случайные по жанру
      </div>}
      {
        randomItemsByGenre && Object.keys(randomItemsByGenre).map((listName, index) => {
          return (
            <div key={index} className={styles.randomItemsByGenre}>
              {!fetching && randomItemsByGenre && <ScrollItems name={listName} 
                items={randomItemsByGenre[listName][Object.keys(randomItemsByGenre[listName])[0]]}
                title={`${listName} - ${Object.keys(randomItemsByGenre[listName])[0]}`} />}
              {fetching && <div className={styles.loading}>
                <img src={loading} alt='' />
              </div>}
            </div>
          )
        })
      }
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