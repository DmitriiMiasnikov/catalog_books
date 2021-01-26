import React from 'react';
import styles from './Animation.module.scss';
import classnames from 'classnames';

export const Animation = ({ animation }) => {
  return (
    <div className={styles.wrapper}>
      {
        animation && animation.map((el, i) => {
          return (
            <div key={i} className={styles.item}>
              <img src={`/img/anime_cover_${i + 1}.jpg`} alt='img' className={styles.image} />
              <div className={styles.info}>
                {el.nameRu && <div className={styles.nameRu}>{el.nameRu}</div>}
                {el.nameEng && <div className={classnames(styles.nameEng, { [styles.nameRu]: !el.nameRu })}>{el.nameEng}</div>}
                {el.nameRom && <div className={styles.nameRom}>{el.nameRom}</div>}
                <div className={styles.date}>дата выхода: {el.date.map((dateEl, j) => {
                  return (
                    <span>
                      {j === 3 && <span> - </span>}
                      <span key={j} className={styles.n}>{dateEl}</span>
                      {j !== el.date.length - 1 && j !== 2 && <span>.</span>}
                    </span>
                  )
                })}</div>
                <div className={styles.author}>автор: {el.author}</div>
                <div className={styles.genre}>жанр: {el.genre.map((genreEl, j) => {
                  return (
                    <span>
                    <span key={j} className={styles.n}>{genreEl}</span>
                    {j !== el.date.length - 1 && <span>, </span>}
                  </span>
                  )
                })}</div>
                <div className={styles.type}>тип: {el.type}</div>
                <div className={styles.auditory}>аудитория: {el.auditory}</div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
// C:\Users\EVANGELION\GitHub\catalog_books\src\assets\img\anime_cover_1.jpg