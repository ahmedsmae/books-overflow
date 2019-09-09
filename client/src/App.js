import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect } from 'react-router-dom';

import { selectUser } from './redux/current-user/current-user.selectors';
import { loadingUserStart } from './redux/current-user/current-user.actions';

import Header from './components/header/header.component';
import ListContainerPage from './pages/list-container/list-container.component';
import ProfilePage from './pages/profile/profile.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HelpPage from './pages/help/help.component';
import ContactUsPage from './pages/contact-us/contact-us.component';
import AboutPage from './pages/about/about.component';

import './App.scss';

const App = ({ currentUser }) => {
  return (
    <Fragment>
      <Header />
      <div className='container'>
        <Switch>
          <Route
            exact
            path='/sign-in'
            render={props =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage {...props} />
              )
            }
          />
          <Route exact path='/about' component={AboutPage} />
          <Route exact path='/contact-us' component={ContactUsPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/help' component={HelpPage} />
          {/* List container should be always at the bottom of the switch */}
          <Route path='/' component={ListContainerPage} />
        </Switch>
      </div>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

const mapDispatchToProps = dispatch => ({
  loadingUserStart: () => dispatch(loadingUserStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
