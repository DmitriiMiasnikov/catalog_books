import React from 'react';
import { Route } from 'react-router-dom';
import styles from './App.module.scss';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <Route exact path='/main' render={() => <Main />} />
      </div>
    </div>
  );
}

export default App;
