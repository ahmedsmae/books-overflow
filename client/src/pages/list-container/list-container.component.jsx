import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { SpecificListTypes } from '../../assets/list.types';

import {
  selectBooks,
  selectColelctions
} from '../../redux/current-user/current-user.selectors';
import {
  getUserBooksStart,
  getUserCollectionsStart
} from '../../redux/current-user/current-user.actions';

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
  getUserBooksStart,
  getUserCollectionsStart,
  location: { pathname },
  type,
  homePageList
}) => {
  useEffect(() => {
    switch (pathname) {
      case '/my-library':
        !userBooks && getUserBooksStart();
        !userCollections && getUserCollectionsStart();
        break;

      default:
    }
  }, [
    pathname,
    userBooks,
    userCollections,
    getUserBooksStart,
    getUserCollectionsStart
  ]);

  switch (pathname) {
    case '/':
      // request saga to fetch the home page data then pass it to the list component
      return (
        <div>
          Home Page
          <ListWithSpinner
            isLoading={homePageList ? false : true}
            type={SpecificListTypes.HOME_PAGE_ITEMS}
            list={homePageList}
          />
        </div>
      );

    case '/my-library':
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

    default:
      return <div>List Container</div>;
  }
};

const mapStateToProps = createStructuredSelector({
  userBooks: selectBooks,
  userCollections: selectColelctions
});

const mapDispatchToProps = dispatch => ({
  getUserBooksStart: () => dispatch(getUserBooksStart()),
  getUserCollectionsStart: () => dispatch(getUserCollectionsStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);
