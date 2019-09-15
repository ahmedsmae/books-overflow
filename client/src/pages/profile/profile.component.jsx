import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUser } from '../../redux/current-user/current-user.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import UserCard from '../../components/user-card/user-card.component';

import './profile.styles.scss';

const UserCardWithSpinner = WithSpinner(UserCard);

const Profile = ({ location: { pathname }, currentUser, selectedUser }) => {
  const myProfile = pathname === '/profile/me';

  // useEffect(() => {
  //   !myProfile && fetchSelectedUser();
  // }, myProfile);

  return (
    <div>
      {myProfile ? (
        <UserCardWithSpinner
          isLoading={currentUser ? false : true}
          user={currentUser}
          myProfile={myProfile}
        />
      ) : (
        <UserCardWithSpinner
          isLoading={selectedUser ? false : true}
          user={selectedUser}
          myProfile={!myProfile}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
