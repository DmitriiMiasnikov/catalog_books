import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import styles from './App.module.scss';
import Header  from './components/Header/HeaderContainer';
import { Main } from './components/Main/Main';

function App() {
  return (
    <div className={styles.page}>
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

export default App;
