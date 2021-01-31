import React from 'react';
import styles from './Search.module.scss';
import searchIcon from './../../assets/Images/search.svg';

export const Search = ({ searchHandler, searchValue }) => {
  return (
    <div className={styles.wrapper}>
      <form>
        <div className={styles.inputBlock}>
          <input placeholder={'название, автор'} type={'text'} value={searchValue} 
            onChange={e => searchHandler(e.target.value)} />
          <div className={styles.searchButton}>
            <img src={searchIcon} alt='search'/>
          </div>
        </div>
      </form>
    </div>
  )
}