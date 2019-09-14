import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect } from 'react-router-dom';

import { selectUser } from './redux/current-user/current-user.selectors';
import { loadingUserStart } from './redux/current-user/current-user.actions';
import { getConversionRatesStart } from './redux/conversion-rates/conversion-rates.action';
import {
  getUserBooksStart,
  getUserCollectionsStart,
  getUserNotificationsStart
} from './redux/current-user/current-user.actions';

import { PATHS } from './assets/list.types';

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

const App = ({
  currentUser,
  loadingUserStart,
  getConversionRatesStart,
  getUserBooksStart,
  getUserCollectionsStart,
  getUserNotificationsStart
}) => {
  useEffect(() => {
    !currentUser && loadingUserStart();
    if (currentUser) {
      getConversionRatesStart();
      getUserBooksStart();
      getUserCollectionsStart();
      getUserNotificationsStart();
    }
  }, [
    currentUser,
    loadingUserStart,
    getConversionRatesStart,
    getUserBooksStart,
    getUserCollectionsStart,
    getUserNotificationsStart
  ]);

  return (
    <Fragment>
      <Header />
      <div className='container'>
        <Switch>
          <Route
            exact
            path={PATHS.SIGN_IN_PATH}
            render={props =>
              currentUser ? (
                <Redirect to={PATHS.LIST_CONTAINER_PATH} />
              ) : (
                <SignInAndSignUpPage {...props} />
              )
            }
          />
          <Route
            exact
            path={PATHS.EDIT_PROFILE_PATH}
            component={EditProfilePage}
          />
          <Route
            exact
            path={PATHS.BOOK_DETAILS_PATH}
            component={BookDetailsPage}
          />
          <Route
            exact
            path={PATHS.COLLECTION_DETAILS_PATH}
            component={CollectionDetailsPage}
          />
          <Route exact path={PATHS.ABOUT_PATH} component={AboutPage} />
          <Route exact path={PATHS.CONTACT_US_PATH} component={ContactUsPage} />
          <Route path={PATHS.PROFILE_PATH} component={ProfilePage} />
          <Route path={PATHS.HELP_PATH} component={HelpPage} />
          {/* List container should be always at the bottom of the switch */}
          <Route
            path={PATHS.LIST_CONTAINER_PATH}
            component={ListContainerPage}
          />
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
  getConversionRatesStart: () => dispatch(getConversionRatesStart()),
  getUserBooksStart: () => dispatch(getUserBooksStart()),
  getUserCollectionsStart: () => dispatch(getUserCollectionsStart()),
  getUserNotificationsStart: () => dispatch(getUserNotificationsStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
