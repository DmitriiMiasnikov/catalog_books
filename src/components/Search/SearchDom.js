import React, { useRef } from 'react';
import styles from './Search.module.scss';
import classnames from 'classnames';
import searchIcon from './../../assets/Images/search.svg';

export const SearchDom = ({ searchHandler, value, setValueFunc }) => {
  const refInput = useRef(null);
  return (
    <div className={styles.wrapper}>
      <form onSubmit={() => searchHandler(refInput.current.value)}>
        <div className={styles.inputBlock}>
          <input placeholder={'название, автор'} ref={refInput} type={'text'} value={value}
            onChange={e => setValueFunc(e.target.value)} />
          <div className={classnames(styles.searchButton, { [styles.active]: value })}
            onClick={() => searchHandler(refInput.current.value)}>
            <img src={searchIcon} alt='search' />
          </div>
        </div>
      </form>
    </div>
  )
}