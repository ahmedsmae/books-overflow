import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';

import { subscribeToChat, sendMessage } from './socket.func';

import { updateChatMsgsSeenStart } from '../../redux/chats/chats.actions';

import UserImage from '../../components/user-image/user-image.component';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './current-chat.styles.scss';

class CurrentChat extends React.Component {
  // PROPS: currentChat
  state = {
    chatId: this.props.currentChat._id,
    ownerId: this.props.currentChat.owner,
    opponentId: this.props.currentChat.opponent._id,
    opponentAvatarId: this.props.currentChat.opponent.avatarid,
    opponentFullName: `${this.props.currentChat.opponent.firstname} ${this.props.currentChat.opponent.lastname}`,
    opponentEmail: this.props.currentChat.opponent.email,
    messages: this.props.currentChat.messages,
    text: ''
  };

  isScrolledIntoView(el) {
    if (el) {
      // this func is to check if an element is visible within the viewport
      var rect = el.getBoundingClientRect();
      var elemTop = rect.top;
      var elemBottom = rect.bottom;

      // Only completely visible elements return true:
      var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
      // Partially visible elements return true:
      //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
      return isVisible;
    }
  }

  scrollToBottom = () => {
    const { ownerId, opponentId } = this.state;
    if (this.isScrolledIntoView(this.messagesEnd)) {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
      // this.props.updateChatMsgsSeenStart(opponentId);
    }
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    const { ownerId, opponentId } = this.state;
    this.props.updateChatMsgsSeenStart(opponentId);
    subscribeToChat({ ownerId, opponentId }, (err, message) => {
      if (err) throw err;
      this.setState({ messages: [...this.state.messages, message] });
    });
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
      ownerId,
      opponentAvatarId,
      opponentFullName,
      opponentEmail,
      messages,
      text
    } = this.state;
    return (
      <div className='card'>
        <div className='card-header sticky-top bg-dark text-white'>
          <div className='row'>
            <div className='col-3 text-center'>
              <UserImage source={`/api/avatars/${opponentAvatarId}`} small />
            </div>
            <div className='col'>
              <h4>{opponentFullName}</h4>
              <h4>{opponentEmail}</h4>
            </div>
          </div>
        </div>

        <div className='card-body py-auto'>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.ownerid === ownerId ? 'mine' : 'yours'
              } messages`}
            >
              <div
                className={`message ${messages[index + 1] &&
                  messages[index + 1].ownerid !== msg.ownerid &&
                  'last'}`}
              >
                <div className='content'>
                  <div className='message-date'>
                    <Moment format='h:mm a'>{moment.utc(msg.createdAt)}</Moment>
                  </div>
                  <span className='message-content'>{msg.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => (this.messagesEnd = el)}
        />

        <div className='card-footer fixed-bottom bg-dark'>
          <div className='container'>
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
                  <CustomButton success type='submit' className='w-100'>
                    Send
                  </CustomButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateChatMsgsSeenStart: opponentId =>
    dispatch(updateChatMsgsSeenStart(opponentId))
});

export default connect(
  null,
  mapDispatchToProps
)(CurrentChat);
