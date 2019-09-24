import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import {
  selectUserBlockedUsersIds,
  selectUser
} from '../../redux/current-user/current-user.selectors';

import BookCard from '../book-card/book-card.component';
import CollectionCard from '../collection-card/collection-card.component';
import NotificationCard from '../notification-card/notification-card.component';
import BlockedUserCard from '../blocked-user-card/blocked-user-card.component';
import ChatCard from '../chat-card/chat-card.component';

import { PATHS } from '../../assets/list.types';

import './list.styles.scss';

const List = ({
  location: { pathname },
  list,
  blockedUsersIds,
  currentUser
}) => {
  if (
    pathname.includes(PATHS.LIBRARY_PATH_NO_ID) ||
    pathname === PATHS.HOME_PATH ||
    pathname === PATHS.FAVOURITES_PATH
  ) {
    // it's an items list
    return (
      <div className='card'>
        <div className='card-body'>
          {list.map((item, index) => {
            // owner of item is not blocked
            if (
              currentUser &&
              item.owner._id &&
              !blockedUsersIds.includes(item.owner._id)
            ) {
              return item.hasOwnProperty('books') ? (
                <CollectionCard collection={item} key={index} />
              ) : (
                <BookCard book={item} key={index} />
              );
            } else if (!currentUser) {
              // public user (not logged in)
              return item.hasOwnProperty('books') ? (
                <CollectionCard collection={item} key={index} />
              ) : (
                <BookCard book={item} key={index} />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else if (pathname === PATHS.NOTIFICATIONS_PATH) {
    //  it's notification list
    return (
      <div className='card'>
        <div className='card-body'>
          {list.map((not, index) => (
            <NotificationCard notification={not} key={index} />
          ))}
        </div>
      </div>
    );
  } else if (pathname === PATHS.BLOCKED_USERS_PATH) {
    //  it's a blocked users list
    return (
      <div className='card'>
        <div className='card-body'>
          {list.map((user, index) => (
            <BlockedUserCard key={index} user={user} />
          ))}
        </div>
      </div>
    );
  } else if (pathname === PATHS.CHATS_PATH) {
    //  it's a chats list
    return (
      <div className='card'>
        <div className='card-body'>
          {list.map((chat, index) => (
            <ChatCard key={index} chat={chat} />
          ))}
        </div>
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  blockedUsersIds: selectUserBlockedUsersIds,
  currentUser: selectUser
});

export default withRouter(connect(mapStateToProps)(List));
