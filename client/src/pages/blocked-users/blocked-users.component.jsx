import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getBlockedUsersStart } from '../../redux/current-user/current-user.actions';

import ListContainer from '../../components/list-container/list-container.component';

import './blocked-users.styles.scss';

const BlockedUsers = ({ getBlockedUsersStart }) => {
  useEffect(() => {
    getBlockedUsersStart();
  }, [getBlockedUsersStart]);

  return <ListContainer />;
};

const mapDispatchToProps = dispatch => ({
  getBlockedUsersStart: () => dispatch(getBlockedUsersStart())
});

export default connect(
  null,
  mapDispatchToProps
)(BlockedUsers);
