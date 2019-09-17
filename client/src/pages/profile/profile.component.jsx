import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getSelectedUserStart } from '../../redux/selected-user/selected-user.actions';
import { selectSelectedUser } from '../../redux/selected-user/selected-user.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import UserCard from '../../components/user-card/user-card.component';

import './profile.styles.scss';

const UserCardWithSpinner = WithSpinner(UserCard);

const Profile = ({ selectedUser, getSelectedUserStart, match }) => {
  const userId = match.params.userid;

  useEffect(() => {
    getSelectedUserStart(userId);
  }, [getSelectedUserStart, userId]);

  return (
    <UserCardWithSpinner
      isLoading={selectedUser ? false : true}
      myProfile={false}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  selectUser: selectSelectedUser
});

const mapDispatchToProps = dispatch => ({
  getSelectedUserStart: id => dispatch(getSelectedUserStart(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
