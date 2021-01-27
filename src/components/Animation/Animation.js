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
              <div className={styles.infoWrapper}>
                {el.nameRu && <div className={styles.title}>{el.nameRu}</div>}
                {el.nameEng && !el.nameRu && <div className={classnames(styles.nameEng, { [styles.title]: !el.nameRu })}>{el.nameEng}</div>}
                {/* {el.nameRom && <div className={styles.nameRom}>{el.nameRom}</div>} */}
                <div className={styles.date}>
                  {el.date.map((dateEl, j) => {
                    return (
                      <span>
                        {j === 3 && <span> - </span>}
                        <span key={j} className={styles.n}>{dateEl}</span>
                        {j !== el.date.length - 1 && j !== 2 && <span>.</span>}
                      </span>
                    )
                  })}
                </div>
                <div className={styles.line}>автор: <span className={styles.lineInfo}>{el.author}</span></div>
                <div className={styles.line}>жанр:
                <span className={styles.lineInfo}>
                    {el.genre.map((genreEl, j) => {
                      return (
                        <span className={styles.info}>
                          <span key={j} className={styles.n}>{genreEl}</span>
                          {j !== el.genre.length - 1 && <span>, </span>}
                        </span>
                      )
                    })}
                  </span>
                </div>
                {el.type && <div className={styles.line}>тип: <span className={styles.lineInfo}>{el.type}</span></div>}
                {el.auditory && <div className={styles.line}>аудитория: <span className={styles.lineInfo}>{el.auditory}</span></div>}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
// C:\Users\EVANGELION\GitHub\catalog_books\src\assets\img\anime_cover_1.jpg