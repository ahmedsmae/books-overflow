import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import { selectUser } from '../../redux/current-user/current-user.selectors';
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
  // currentUser,
  getUserBooksStart,
  getUserCollectionsStart,
  getUserNotificationsStart
}) => {
  useEffect(() => {
    getUserBooksStart();
    getUserCollectionsStart();
    getUserNotificationsStart();
  }, [getUserBooksStart, getUserCollectionsStart, getUserNotificationsStart]);

  return (
    <div>
      My Profile
      <UserCardWithSpinner
        // isLoading={currentUser ? false : true}
        myProfile={true}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  // currentUser: selectUser
});

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
