import React, { useRef } from 'react';
import styles from './Search.module.scss';
import classnames from 'classnames';
import searchIcon from './../../assets/Images/search.svg';
import { NavLink } from 'react-router-dom';

export const SearchDom = ({ searchHandler, value, setValueFunc }) => {
  const refInput = useRef(null);
  return (
    <div className={styles.wrapper}>
      <form onSubmit={e => searchHandler(refInput.current.value, e)} action={`/animation/list/1`}>
        <div className={styles.inputBlock}>
          <input placeholder={'название, автор'} ref={refInput} type={'text'} value={value}
            onChange={e => setValueFunc(e.target.value)} />
          <NavLink className={classnames(styles.searchButton, { [styles.active]: value })}
            onClick={(e) => searchHandler(refInput.current.value, e)} to={`/animation/list/1`}>
            <img src={searchIcon} alt='search' />
          </NavLink>
        </div>
      </form>
    </div>
  )
}