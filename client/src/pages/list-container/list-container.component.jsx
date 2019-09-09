import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { SpecificListTypes } from '../../assets/list.types';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import List from '../../components/list/list.component';

import './list-container.styles.scss';

const ListWithSpinner = WithSpinner(List);

/**
 * @action - will fetch data from the server based on the recieved type
 * @param {type} - type of list that will be fetched here
 */
const ListContainer = ({
  location: { pathname },
  type,
  homePageList,
  myBooksList
}) => {
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

    case '/mybooks':
      // request saga to fetch my books then pass it to the list component
      return (
        <div>
          My Books Page
          <ListWithSpinner
            isLoading={myBooksList ? false : true}
            type={SpecificListTypes.MY_BOOKS}
            list={myBooksList}
          />
        </div>
      );

    default:
      return <div>List Container</div>;
  }
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);
