import React, { useEffect, Fragment, lazy, Suspense } from 'react';
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
import Spinner from './components/spinner/spinner.component';
import ErrorBoundry from './components/error-boundry/error-boundry.component';

import './App.scss';

const HomePage = lazy(() => import('./pages/home/home.component'));
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);
const BookDetailsPage = lazy(() =>
  import('./pages/book-details/book-details.component')
);
const CollectionDetailsPage = lazy(() =>
  import('./pages/collection-details/collection-details.component')
);
const ChatsPage = lazy(() => import('./pages/chats/chats.component'));
const CurrentChatContainerPage = lazy(() =>
  import('./pages/current-chat-container/current-chat-container.component')
);
const MyProfilePage = lazy(() =>
  import('./pages/my-profile/my-profile.component')
);
const ProfilePage = lazy(() => import('./pages/profile/profile.component'));
const MyLibraryPage = lazy(() =>
  import('./pages/my-library/my-library.component')
);
const LibraryPage = lazy(() => import('./pages/library/library.components'));
const EditProfilePage = lazy(() =>
  import('./pages/edit-profile/edit-profile.component')
);
const FavouritesPage = lazy(() =>
  import('./pages/favourites/favourites.component')
);
const BlockedUsersPage = lazy(() =>
  import('./pages/blocked-users/blocked-users.component')
);
const NotificationsPage = lazy(() =>
  import('./pages/notifications/notifications.component')
);
const ChangePasswordPage = lazy(() =>
  import('./pages/change-password/change-password.component')
);
const ForgetPasswordPage = lazy(() =>
  import('./pages/forget-password/forget-password.component')
);
const DeleteUserPage = lazy(() =>
  import('./pages/delete-user/delete-user.component')
);
const ContactUsPage = lazy(() =>
  import('./pages/contact-us/contact-us.component')
);
const AboutPage = lazy(() => import('./pages/about/about.component'));
const Page404 = lazy(() => import('./pages/page-404/page-404.component'));

const App = ({
  currentUser,
  loadingUserStart,
  getConversionRatesStart,
  getUserUnseenMsgsCountStart
}) => {
  useEffect(() => {
    loadingUserStart();
  }, [loadingUserStart]);

  useEffect(() => {
    getConversionRatesStart();
    currentUser && getUserUnseenMsgsCountStart();
  }, [currentUser, getUserUnseenMsgsCountStart, getConversionRatesStart]);

  return (
    <Fragment>
      <div className='wrapper'>
        <Header />
        <div className='container'>
          <ErrorBoundry>
            <Suspense fallback={<Spinner />}>
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
                      <CurrentChatContainerPage {...props} />
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
                <Route
                  exact
                  path={PATHS.CONTACT_US_PATH}
                  component={ContactUsPage}
                />
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
            </Suspense>
          </ErrorBoundry>
        </div>
        <div className='push mt-3' />
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
