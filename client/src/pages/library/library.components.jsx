import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSelectedUser } from '../../redux/selected-user/selected-user.selectors';
import { getSelectedUserStart } from '../../redux/selected-user/selected-user.actions';
import ListContainer from '../../components/list-container/list-container.component';

import './library.styles.scss';

const Library = ({ match, getSelectedUserStart, selectedUser }) => {
  const userId = match.params.userid;

  useEffect(() => {
    !selectedUser && getSelectedUserStart(userId);
  }, [selectedUser, getSelectedUserStart, userId]);

  return <ListContainer />;
};

const mapStateToProps = createStructuredSelector({
  selectedUser: selectSelectedUser
});

const mapDispatchToProps = dispatch => ({
  getSelectedUserStart: id => dispatch(getSelectedUserStart(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
