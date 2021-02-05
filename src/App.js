import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/HeaderContainer';
import { Main } from './components/Main/Main';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import UserMenu from './components/UserMenu/UserMenu';
import Users from './components/Users/Users';
import User from './components/User/User';
import Books from './components/Books/BooksContainer';
import Authors from './components/Authors/AuthorsContainer';
import Animation from './components/Animation/AnimationContainer'
import AnimationFilters from './components/AnimationFilters/AnimationFiltersContainer';
import AnimationDescription from './components/AnimationDescription/AnimationDescriptionContainer';
import Registration from './components/Registration/Registration';
import UsersMenu from './components/UsersMenu/UsersMenu';

function App({ theme }) {
  return (
    <div className={classnames(styles.page, { [styles.black]: theme === 'black', [styles.white]: theme === 'white' })}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.menu}>
          <UserMenu />
          <Route path='/animation/list' render={() => <AnimationFilters />} />
          <UsersMenu />
        </div>
        <div className={styles.content}>
          <Switch>
            <Redirect exact from='/' to='/main' />
            <Route exact path='/main' render={() => <Main />} />
            <Route exact path='/books' render={() => <Books />} />
            <Route exact path='/authors' render={() => <Authors />} />
            <Route exact path='/animation/list/:page?' render={() => <Animation />} />
            <Route exact path={`/animation/id/:animationId?`} render={() => <AnimationDescription />} />
            <Route exact path={`/users/:userId`} render={() => <User />} />
            <Route exact path={`/registration`} render={() => <Registration />} />
            <Route exact path={`/users`} render={() => <Users />} />
          </Switch>
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
export default compose(
  connect(mapStatesToProps, {})
)(App);

