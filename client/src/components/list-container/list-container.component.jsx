import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PATHS } from '../../assets/list.types';

import {
  selectBooks,
  selectCollections,
  selectNotifications,
  selectUser
} from '../../redux/current-user/current-user.selectors';
import { selectPublicItems } from '../../redux/public-items/public-items.selectors';
import { selectSelectedUser } from '../../redux/selected-user/selected-user.selectors';

import WithSpinner from '../with-spinner/with-spinner.component';
import List from '../list/list.component';

import './list-container.styles.scss';

const ListWithSpinner = WithSpinner(List);

const ListContainer = ({
  userBooks,
  userCollections,
  userNotifications,
  publicItems,
  selectedUser,
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
        <div>
          <ListWithSpinner
            // ! check for both books and collections
            isLoading={userBooks && userCollections ? false : true}
            list={[...userBooks, ...userCollections]}
          />
        </div>
      );

    case PATHS.LIBRARY_PATH + '/' + selectUser._id:
      return (
        <div>
          <ListWithSpinner
            isLoading={selectedUser ? false : true}
            list={selectedUser.items}
          />
        </div>
      );

    case PATHS.MY_NOTIFICATIONS_PATH:
      return (
        <div>
          <ListWithSpinner
            isLoading={userNotifications ? false : true}
            list={userNotifications}
          />
        </div>
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
  selectedUser: selectSelectedUser
});

export default withRouter(connect(mapStateToProps)(ListContainer));
