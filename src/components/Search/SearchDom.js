import React, { useRef } from 'react';
import styles from './Search.module.scss';
import classnames from 'classnames';
import searchIcon from './../../assets/Images/search.svg';
import close from './../../assets/Images/close.svg'

export const SearchDom = ({ searchHandler, value, setValueFunc, searchValue, cancelSeach }) => {
  const refInput = useRef(null);
  return (
    <div className={styles.wrapper}>
      <div className={classnames(styles.searchItem, { [styles.hide]: !searchValue })}>
        <span>{searchValue}</span>
        <img src={close} className={styles.cancelButton} onClick={() => cancelSeach()}/>
      </div>
      <form onSubmit={e => searchHandler(refInput.current.value, e)}>
        <div className={styles.inputBlock}>
          <input placeholder={'название, автор'} ref={refInput} type={'text'} value={value}
            onChange={e => setValueFunc(e.target.value)} />
          <div className={classnames(styles.searchButton, { [styles.active]: value })}
            onClick={(e) => searchHandler(refInput.current.value, e)}>
            <img src={searchIcon} alt='search' />
          </div>
        </div>
      </form>
    </div>
  )
}