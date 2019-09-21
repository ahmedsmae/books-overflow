import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getUserBasicChatsStart } from '../../redux/chats/chats.actions';

import ListContainer from '../../components/list-container/list-container.component';

import './chats.styles.scss';

const Chats = ({ getUserBasicChatsStart }) => {
  useEffect(() => {
    getUserBasicChatsStart();
  }, [getUserBasicChatsStart]);

  return <ListContainer />;
};

const mapDispatchToProps = dispatch => ({
  getUserBasicChatsStart: () => dispatch(getUserBasicChatsStart())
});

export default connect(
  null,
  mapDispatchToProps
)(Chats);
