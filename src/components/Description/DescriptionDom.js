import React from 'react';
import styles from './Description.module.scss';
import classnames from 'classnames';
import ButtonSwitcher from '../ButtonSwitcher/ButtonSwitcher';
import Stars from '../Stars/Stars';

export const DescriptionDom = ({ selectedDescription, catalogName }) => {
  return (
    <div className={styles.wrapper}>
      {selectedDescription && <div className={styles.infoWrap}>
        <div className={styles.info}>
          {selectedDescription.nameRu && <div className={styles.title}>
            {selectedDescription.nameRu}</div>}
          {selectedDescription.nameEng && <div className={classnames(styles.nameEng, {
            [styles.title]: !selectedDescription.nameRu,
            [styles.line]: selectedDescription.nameRu
          })}>
            {selectedDescription.nameRu && <span>на английском: </span>}
            <span className={styles.lineInfo}>
              {selectedDescription.nameEng}
            </span>
          </div>}
          {selectedDescription.dateStart && <div className={styles.date}>
            {selectedDescription.dateStart.split('-').reverse().join('.')} {selectedDescription.dateEnd && '- '}
            {selectedDescription.dateEnd && selectedDescription.dateEnd.split('-').reverse().join('.')}
          </div>}
          {selectedDescription.author && <div className={styles.line}>автор: <span className={styles.lineInfo}>{selectedDescription.author}</span></div>}
          {selectedDescription.genre && <div className={styles.line}>жанр:
                <span className={styles.lineInfo}>
              {selectedDescription.genre.map((genreEl, j) => {
                return (
                  <span className={styles.lineInfoGenre} key={j}>
                    <span className={styles.n}>{genreEl}</span>
                    {j !== selectedDescription.genre.length - 1 && <span>, </span>}
                  </span>
                )
              })}
            </span>
          </div>}
          {selectedDescription.type && <div className={styles.line}>тип: <span className={styles.lineInfo}>
            {selectedDescription.type}
          </span></div>}
          {selectedDescription.auditory && <div className={styles.line}>аудитория: <span className={styles.lineInfo}>
            {selectedDescription.auditory}
          </span></div>}
        </div>
        <div className={styles.imageWrap}>
          <img src={`https://anime.amyasnikov.pro/${catalogName}/${catalogName}_cover_${selectedDescription[`${catalogName}Id`]}.jpg`} 
            alt='img' className={styles.image} />
          <div className={styles.controlPanel}>
            <Stars list={'animation'} currentId={selectedDescription.animationId} />
            <div className={styles.buttonSwither}>
            <ButtonSwitcher currentId={selectedDescription.animationId} list={'animation'} />
            </div>
          </div>
        </div>
        <div className={styles.descriptionWrap}>
          <div className={styles.title}>
            Описание:
          </div>
          <div className={styles.text}>
            {selectedDescription.description}
          </div>
        </div>
      </div>}
    </div>
  )
}