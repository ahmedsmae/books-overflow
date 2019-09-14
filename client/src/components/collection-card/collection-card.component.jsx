import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUser } from '../../redux/current-user/current-user.selectors';
import { setSelectedItem } from '../../redux/current-user/current-user.actions';

import CustomButton from '../custom-button/custom-button.component';

import './collection-card.styles.scss';
import { cookie } from 'express-validator';

const CollectionCard = ({ collection, currentUser, setSelectedItem }) => {
  const {
    owner,
    status,
    title,
    numberofbooks,
    books,
    category,
    language,
    summary,
    price,
    currency,
    latitude,
    longitude,
    keywords,
    imageids
  } = collection;

  return (
    <div className='card m-3'>
      <div className='card-body'>
        <h2>{title}</h2>
        {books.map((book, index) => (
          <p className='lead' key={index}>
            {`${book.title} | ${book.author} | ${book.condition}`}
          </p>
        ))}
        <p className='lead'>{`${category} | ${language}`}</p>
      </div>
      <div className='card-footer text-right'>
        {currentUser._id === owner ? (
          <Link to='/collection-details'>
            <CustomButton
              small
              primary
              outline
              onClick={() => setSelectedItem(collection)}
            >
              Edit Collection
            </CustomButton>
          </Link>
        ) : (
          // NOT THE OWNER OF THE BOOK
          currentUser && (
            // CHECK IF U ARE REGISTERED BEFORE YOU CAN MESSAGE THE OWNER
            <CustomButton
              small
              primary
              outline
              onClick={() => setSelectedItem(collection)}
            >
              Message Owner
            </CustomButton>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

const mapDispatchToProps = dispatch => ({
  setSelectedItem: item => dispatch(setSelectedItem(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionCard);
