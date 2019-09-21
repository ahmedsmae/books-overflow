import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect } from 'react-router-dom';

import { selectUser } from './redux/current-user/current-user.selectors';
import { loadingUserStart } from './redux/current-user/current-user.actions';
import { getConversionRatesStart } from './redux/conversion-rates/conversion-rates.action';
import { getUserUnseenMsgsCountStart } from './redux/chats/chats.actions';

import { PATHS } from './assets/list.types';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import HomePage from './pages/home/home.component';
import ProfilePage from './pages/profile/profile.component';
import LibraryPage from './pages/library/library.components';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import EditProfilePage from './pages/edit-profile/edit-profile.component';
import BookDetailsPage from './pages/book-details/book-details.component';
import CollectionDetailsPage from './pages/collection-details/collection-details.component';
import ContactUsPage from './pages/contact-us/contact-us.component';
import AboutPage from './pages/about/about.component';
import ChangePasswordPage from './pages/change-password/change-password.component';
import ForgetPasswordPage from './pages/forget-password/forget-password.component';
import NotificationsPage from './pages/notifications/notifications.component';
import BlockedUsersPage from './pages/blocked-users/blocked-users.component';
import FavouritesPage from './pages/favourites/favourites.component';
import MyLibraryPage from './pages/my-library/my-library.component';
import MyProfilePage from './pages/my-profile/my-profile.component';
import DeleteUserPage from './pages/delete-user/delete-user.component';
import ChatsPage from './pages/chats/chats.component';
import CurrentChatPage from './pages/current-chat/current-chat.component';
import Page404 from './pages/page-404/page-404.component';

import './App.scss';

const App = ({
  currentUser,
  loadingUserStart,
  getConversionRatesStart,
  getUserUnseenMsgsCountStart
}) => {
  useEffect(() => {
    loadingUserStart();
    getConversionRatesStart();
    getUserUnseenMsgsCountStart();
  }, [loadingUserStart, getConversionRatesStart, getUserUnseenMsgsCountStart]);

  return (
    <Fragment>
      <Header />
      <div className='container'>
        <Switch>
          {/* PRIVATE ROUTES */}
          <Route
            exact
            path={PATHS.BOOK_DETAILS_PATH}
            render={props =>
              currentUser ? (
                <BookDetailsPage {...props} />
              ) : (
                <Redirect to={PATHS.HOME_PATH} />
              )
            }
          />
          <Route
            exact
            path={PATHS.COLLECTION_DETAILS_PATH}
            render={props =>
              currentUser ? (
                <CollectionDetailsPage {...props} />
              ) : (
                <Redirect to={PATHS.HOME_PATH} />
              )
            }
          />
          <Route
            exact
            path={PATHS.EDIT_PROFILE_PATH}
            render={props =>
              currentUser ? (
                <EditProfilePage {...props} />
              ) : (
                <Redirect to={PATHS.HOME_PATH} />
              )
            }
          />
          <Route
            exact
            path={PATHS.CHANGE_PASSWORD_PATH}
            render={props =>
              currentUser ? (
                <ChangePasswordPage {...props} />
              ) : (
                <Redirect to={PATHS.HOME_PATH} />
              )
            }
          />
          <Route
            exact
            path={PATHS.NOTIFICATIONS_PATH}
            render={props =>
              currentUser ? (
                <NotificationsPage {...props} />
              ) : (
                <Redirect to={PATHS.HOME_PATH} />
              )
            }
          />
          <Route
            exact
            path={PATHS.FAVOURITES_PATH}
            render={props =>
              currentUser ? (
                <FavouritesPage {...props} />
              ) : (
                <Redirect to={PATHS.HOME_PATH} />
              )
            }
          />
          <Route
            exact
            path={PATHS.BLOCKED_USERS_PATH}
            render={props =>
              currentUser ? (
                <BlockedUsersPage {...props} />
              ) : (
                <Redirect to={PATHS.HOME_PATH} />
              )
            }
          />
          <Route
            exact
            path={PATHS.MY_LIBRARY_PATH}
            render={props =>
              currentUser ? (
                <MyLibraryPage {...props} />
              ) : (
                <Redirect to={PATHS.HOME_PATH} />
              )
            }
          />
          <Route
            exact
            path={PATHS.MY_PROFILE_PATH}
            render={props =>
              currentUser ? (
                <MyProfilePage {...props} />
              ) : (
                <Redirect to={PATHS.HOME_PATH} />
              )
            }
          />
          <Route
            exact
            path={PATHS.DELETE_USER_PATH}
            render={props =>
              currentUser ? (
                <DeleteUserPage {...props} />
              ) : (
                <Redirect to={PATHS.HOME_PATH} />
              )
            }
          />
          <Route
            exact
            path={PATHS.CHATS_PATH}
            render={props =>
              currentUser ? (
                <ChatsPage {...props} />
              ) : (
                <Redirect to={PATHS.HOME_PATH} />
              )
            }
          />
          <Route
            exact
            path={PATHS.CURRENT_CHAT_PATH}
            render={props =>
              currentUser ? (
                <CurrentChatPage {...props} />
              ) : (
                <Redirect to={PATHS.HOME_PATH} />
              )
            }
          />

          {/* PUBLIC ROUTES */}
          <Route exact path={PATHS.HOME_PATH} component={HomePage} />
          <Route
            exact
            path={PATHS.SIGN_IN_PATH}
            render={props =>
              currentUser ? (
                <Redirect to={PATHS.HOME_PATH} />
              ) : (
                <SignInAndSignUpPage {...props} />
              )
            }
          />
          <Route exact path={PATHS.ABOUT_PATH} component={AboutPage} />
          <Route exact path={PATHS.CONTACT_US_PATH} component={ContactUsPage} />
          <Route
            exact
            path={PATHS.FORGET_PASSWORD_PATH}
            component={ForgetPasswordPage}
          />
          <Route path={PATHS.LIBRARY_PATH} component={LibraryPage} />
          <Route path={PATHS.PROFILE_PATH} component={ProfilePage} />

          {/* if nothing matches so far > 404 */}
          <Route component={Page404} />
        </Switch>
      </div>
      <Footer />
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

const mapDispatchToProps = dispatch => ({
  loadingUserStart: () => dispatch(loadingUserStart()),
  getConversionRatesStart: () => dispatch(getConversionRatesStart()),
  getUserUnseenMsgsCountStart: () => dispatch(getUserUnseenMsgsCountStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
