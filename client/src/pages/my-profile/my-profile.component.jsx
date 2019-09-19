import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getUserBooksStart,
  getUserCollectionsStart,
  getUserNotificationsStart
} from '../../redux/current-user/current-user.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import UserCard from '../../components/user-card/user-card.component';

import './my-profile.styles.scss';

const UserCardWithSpinner = WithSpinner(UserCard);

const MyProfile = ({
  getUserBooksStart,
  getUserCollectionsStart,
  getUserNotificationsStart
}) => {
  useEffect(() => {
    getUserBooksStart();
    getUserCollectionsStart();
    getUserNotificationsStart();
  }, [getUserBooksStart, getUserCollectionsStart, getUserNotificationsStart]);

  return <UserCardWithSpinner myProfile={true} />;
};

const mapStateToProps = createStructuredSelector({});

// fetch selected user
const mapDispatchToProps = dispatch => ({
  getUserBooksStart: () => dispatch(getUserBooksStart()),
  getUserCollectionsStart: () => dispatch(getUserCollectionsStart()),
  getUserNotificationsStart: () => dispatch(getUserNotificationsStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfile);
