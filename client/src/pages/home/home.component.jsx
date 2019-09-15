import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import SearchCard from '../../components/search-card/search-card.component';
import ListContainer from '../../components/list-container/list-container.component';

import { getAllPublicItemsStart } from '../../redux/public-items/public-items.actions';

const Home = ({ getAllPublicItemsStart }) => {
  useEffect(() => {
    getAllPublicItemsStart();
  }, [getAllPublicItemsStart]);

  return (
    <div>
      <SearchCard />
      <ListContainer />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getAllPublicItemsStart: () => dispatch(getAllPublicItemsStart())
});

export default connect(
  null,
  mapDispatchToProps
)(Home);
