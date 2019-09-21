import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PATHS } from '../../assets/list.types';

import {
  selectBooks,
  selectCollections,
  selectNotifications,
  selectFavourites,
  selectBlockedUsers
} from '../../redux/current-user/current-user.selectors';
import { selectPublicItems } from '../../redux/public-items/public-items.selectors';
import { selectSelectedUser } from '../../redux/selected-user/selected-user.selectors';
import { selectBasicChats } from '../../redux/chats/chats.selectors';

import WithSpinner from '../with-spinner/with-spinner.component';
import List from '../list/list.component';

import './list-container.styles.scss';

const ListWithSpinner = WithSpinner(List);

const ListContainer = ({
  userBooks,
  userCollections,
  userNotifications,
  userFavourites,
  publicItems,
  selectedUser,
  blockedUsers,
  basicChats,
  location: { pathname }
}) => {
  switch (pathname) {
    case PATHS.HOME_PATH:
      // request saga to fetch the home page data then pass it to the list component
      return (
        <ListWithSpinner
          isLoading={publicItems ? false : true}
          list={publicItems}
        />
      );

    case PATHS.MY_LIBRARY_PATH:
      return (
        <ListWithSpinner
          // ! check for both books and collections
          isLoading={userBooks && userCollections ? false : true}
          list={[...userBooks, ...userCollections]}
        />
      );

    case PATHS.LIBRARY_PATH_NO_ID + selectedUser._id:
      return (
        <ListWithSpinner
          isLoading={selectedUser ? false : true}
          list={selectedUser.items}
        />
      );

    case PATHS.NOTIFICATIONS_PATH:
      return (
        <ListWithSpinner
          isLoading={userNotifications ? false : true}
          list={userNotifications}
        />
      );

    case PATHS.FAVOURITES_PATH:
      return (
        <ListWithSpinner
          isLoading={userFavourites ? false : true}
          list={userFavourites}
        />
      );

    case PATHS.BLOCKED_USERS_PATH:
      return (
        <ListWithSpinner
          isLoading={blockedUsers ? false : true}
          list={blockedUsers}
        />
      );

    case PATHS.CHATS_PATH:
      return (
        <ListWithSpinner
          isLoading={basicChats ? false : true}
          list={basicChats}
        />
      );

    default:
      return <div>List Container</div>;
  }
};

const mapStateToProps = createStructuredSelector({
  userBooks: selectBooks,
  userCollections: selectCollections,
  userNotifications: selectNotifications,
  publicItems: selectPublicItems,
  selectedUser: selectSelectedUser,
  userFavourites: selectFavourites,
  blockedUsers: selectBlockedUsers,
  basicChats: selectBasicChats
});

export default withRouter(connect(mapStateToProps)(ListContainer));
