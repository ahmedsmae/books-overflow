import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PATHS, SpecificListTypes } from '../../assets/list.types';

import {
  selectBooks,
  selectCollections,
  selectNotifications
} from '../../redux/current-user/current-user.selectors';
import { selectPublicItems } from '../../redux/public-items/public-items.selectors';

import {
  getUserBooksStart,
  getUserCollectionsStart,
  getUserNotificationsStart
} from '../../redux/current-user/current-user.actions';
import { getAllPublicItemsStart } from '../../redux/public-items/public-items.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import List from '../../components/list/list.component';

import './list-container.styles.scss';

const ListWithSpinner = WithSpinner(List);

/**
 * @action - will fetch data from the server based on the recieved type
 * @param {type} - type of list that will be fetched here
 */
const ListContainer = ({
  userBooks,
  userCollections,
  userNotifications,
  publicItems,
  getUserBooksStart,
  getUserCollectionsStart,
  getUserNotificationsStart,
  getAllPublicItemsStart,
  location: { pathname },
  type
}) => {
  useEffect(() => {
    switch (pathname) {
      case PATHS.LIST_CONTAINER_PATH:
        !publicItems && getAllPublicItemsStart();
        break;

      case PATHS.MY_LIBRARY_PATH:
        !userBooks && getUserBooksStart();
        !userCollections && getUserCollectionsStart();
        break;

      case PATHS.MY_NOTIFICATIONS_PATH:
        !userNotifications && getUserNotificationsStart();
        break;

      default:
    }
  }, [
    pathname,
    publicItems,
    userBooks,
    userCollections,
    userNotifications,
    getAllPublicItemsStart,
    getUserBooksStart,
    getUserCollectionsStart,
    getUserNotificationsStart
  ]);

  switch (pathname) {
    case PATHS.LIST_CONTAINER_PATH:
      // request saga to fetch the home page data then pass it to the list component
      return (
        <div>
          Home Page
          <ListWithSpinner
            isLoading={publicItems ? false : true}
            type={SpecificListTypes.HOME_PAGE_ITEMS}
            list={publicItems}
          />
        </div>
      );

    case PATHS.MY_LIBRARY_PATH:
      return (
        <div>
          <ListWithSpinner
            // ! check for both books and collections
            isLoading={userBooks ? false : true}
            type={SpecificListTypes.MY_LIBRARY}
            list={[...userBooks, ...userCollections]}
          />
        </div>
      );

    case PATHS.MY_NOTIFICATIONS_PATH:
      return (
        <div>
          <ListWithSpinner
            isLoading={userNotifications ? false : true}
            type={SpecificListTypes.MY_NOTIFICATIONS}
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
  publicItems: selectPublicItems
});

const mapDispatchToProps = dispatch => ({
  getUserBooksStart: () => dispatch(getUserBooksStart()),
  getUserCollectionsStart: () => dispatch(getUserCollectionsStart()),
  getUserNotificationsStart: () => dispatch(getUserNotificationsStart()),
  getAllPublicItemsStart: () => dispatch(getAllPublicItemsStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);
