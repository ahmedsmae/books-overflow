import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './collection-details.styles.scss';

class CollectionDetails extends React.Component {
  state = {};

  render() {
    return <div>Collection Details</div>;
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionDetails);
