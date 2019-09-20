import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getUserFavouriteStart } from '../../redux/current-user/current-user.actions';

import ListContainer from '../../components/list-container/list-container.component';

import './favourites.styles.scss';

const Favourites = ({ getUserFavouriteStart }) => {
  useEffect(() => {
    getUserFavouriteStart();
  }, [getUserFavouriteStart]);

  return <ListContainer />;
};

const mapDispatchToProps = dispatch => ({
  getUserFavouriteStart: () => dispatch(getUserFavouriteStart())
});

export default connect(
  null,
  mapDispatchToProps
)(Favourites);
