import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import SearchCard from '../../components/search-card/search-card.component';
import ListContainer from '../../components/list-container/list-container.component';

import { getAllPublicItemsStart } from '../../redux/public-items/public-items.actions';

import './home.styles.scss';

const Home = ({ getAllPublicItemsStart }) => {
  useEffect(() => {
    getAllPublicItemsStart();
  }, [getAllPublicItemsStart]);

  return (
    <Fragment>
      <SearchCard />
      <ListContainer />
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  getAllPublicItemsStart: () => dispatch(getAllPublicItemsStart())
});

export default connect(
  null,
  mapDispatchToProps
)(Home);
