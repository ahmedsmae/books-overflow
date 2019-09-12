import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect } from 'react-router-dom';

import { selectUser } from './redux/current-user/current-user.selectors';
import { loadingUserStart } from './redux/current-user/current-user.actions';
import { getConversionRatesStart } from './redux/conversion-rates/conversion-rates.action';

import Header from './components/header/header.component';
import ListContainerPage from './pages/list-container/list-container.component';
import ProfilePage from './pages/profile/profile.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import EditProfilePage from './pages/edit-profile/edit-profile.component';
import BookDetailsPage from './pages/book-details/book-details.component';
import CollectionDetailsPage from './pages/collection-details/collection-details.component';
import HelpPage from './pages/help/help.component';
import ContactUsPage from './pages/contact-us/contact-us.component';
import AboutPage from './pages/about/about.component';

import './App.scss';

const App = ({ currentUser, loadingUserStart, getConversionRatesStart }) => {
  useEffect(() => {
    loadingUserStart();
    getConversionRatesStart();
  }, [loadingUserStart, getConversionRatesStart]);

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
          <Route exact path='/edit-profile' component={EditProfilePage} />
          <Route exact path='/book-details' component={BookDetailsPage} />
          <Route
            exact
            path='/collection-details'
            component={CollectionDetailsPage}
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
  loadingUserStart: () => dispatch(loadingUserStart()),
  getConversionRatesStart: () => dispatch(getConversionRatesStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
