import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import styles from './App.module.scss';
import Header  from './components/Header/HeaderContainer';
import { Main } from './components/Main/Main';
import classnames from 'classnames';
import { connect } from 'react-redux'

function App({ theme }) {
  return (
    <div className={classnames(styles.page, {[styles.black]: theme === 'black', [styles.white]: theme === 'white'})}>
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <Redirect from='/' to='/main' />
        <Route exact path='/main' render={() => <Main />} />
      </div>
    </div>
    </div>
  );
}

const mapStatesToProps = (state) => {
  return {
    theme: state.main.theme
  }
}
export default connect(mapStatesToProps, {})(App);

