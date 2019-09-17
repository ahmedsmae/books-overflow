import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getSelectedUserStart } from '../../redux/selected-user/selected-user.actions';
import ListContainer from '../../components/list-container/list-container.component';

import './library.styles.scss';

const Library = ({ match, getSelectedUserStart }) => {
  const userId = match.params.userid;

  useEffect(() => {
    getSelectedUserStart(userId);
  }, [getSelectedUserStart, userId]);

  return (
    <div>
      Library
      <ListContainer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  getSelectedUserStart: id => dispatch(getSelectedUserStart(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
