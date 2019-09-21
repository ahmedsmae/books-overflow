import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { subscribeToChat, sendMessage, recieveMessage } from './socket.func';

import { selectCurrentChat } from '../../redux/chats/chats.selectors';
import { pushMsgToCurrentChat } from '../../redux/chats/chats.actions';

import UserImage from '../../components/user-image/user-image.component';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './current-chat.styles.scss';

class CurrentChat extends React.Component {
  // PROPS: currentChat, pushMsgToCurrentChat
  state = {
    chatId: null,
    ownerId: null,
    opponentId: null,
    opponentAvatarId: null,
    opponentFullName: '',
    opponentEmail: '',
    messages: [],
    text: ''
  };

  static getDerivedStateFromProps(props, currentState) {
    if (props.currentChat) {
      return {
        chatId: props.currentChat._id,
        ownerId: props.currentChat.owner,
        opponentId: props.currentChat.opponent._id,
        opponentAvatarId: props.currentChat.opponent.avatarid,
        opponentFullName: `${props.currentChat.opponent.firstname} ${props.currentChat.opponent.lastname}`,
        opponentEmail: props.currentChat.opponent.email,
        messages: props.currentChat.messages
      };
    }
    return null;
  }

  componentDidMount() {
    const { ownerId, opponentId } = this.state;
    subscribeToChat({ ownerId, opponentId });

    recieveMessage(msg => pushMsgToCurrentChat(msg));
  }

  handleSubmit = e => {
    e.preventDefault();
    const { ownerId, text } = this.state;
    const date = new Date();
    const msg = {
      ownerid: ownerId,
      text,
      // there is a date difference
      createdAt: date.setHours(date.getHours() + 4),
      seen: false
    };
    sendMessage(msg);
    this.setState({ text: '' });
  };

  render() {
    const {
      // chatId,
      // ownerId,
      // opponentId,
      opponentAvatarId,
      opponentFullName,
      opponentEmail,
      messages,
      text
    } = this.state;
    return (
      <div className='card'>
        <div className='card-header'>
          <div className='row'>
            <div className='col-3'>
              <UserImage source={`/api/avatars/${opponentAvatarId}`} medium />
            </div>
            <div className='col'>
              <h4>{opponentFullName}</h4>
              <h4>{opponentEmail}</h4>
            </div>
          </div>
        </div>

        <div className='card-body py-auto'>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>

        <div className='card-footer'>
          <form onSubmit={this.handleSubmit}>
            <div className='row'>
              <div className='col'>
                <FormInput
                  value={text}
                  onChange={e => this.setState({ text: e.target.value })}
                  placeholder='Type a message...'
                />
              </div>
              <div className='col-2'>
                <CustomButton outline success type='submit' />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentChat: selectCurrentChat
});

const mapDispatchToProps = dispatch => ({
  pushMsgToCurrentChat: message => dispatch(pushMsgToCurrentChat(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentChat);
