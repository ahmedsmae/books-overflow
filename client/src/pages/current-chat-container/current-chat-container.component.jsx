import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentChat } from '../../redux/chats/chats.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CurrentChatPage from '../current-chat/current-chat.component';

import './current-chat-container.styles.scss';

const CurrentChatPageWithSpinner = WithSpinner(CurrentChatPage);

const CurrentChatContainer = ({ currentChat }) => {
  return (
    <CurrentChatPageWithSpinner
      isLoading={currentChat ? false : true}
      currentChat={currentChat}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  currentChat: selectCurrentChat
});

export default connect(mapStateToProps)(CurrentChatContainer);
