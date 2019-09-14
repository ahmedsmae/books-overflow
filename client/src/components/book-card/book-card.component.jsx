import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUser } from '../../redux/current-user/current-user.selectors';
import { setSelectedItem } from '../../redux/current-user/current-user.actions';

import CustomButton from '../custom-button/custom-button.component';

import './book-card.styles.scss';

const BookCard = ({ book, currentUser, setSelectedItem }) => {
  const {
    owner,
    status,
    title,
    author,
    publishdate,
    category,
    language,
    summary,
    condition,
    price,
    currency,
    latitude,
    longitude,
    keywords,
    imageids
  } = book;

  return (
    <div className='card m-3'>
      <div className='card-body'>
        <h2>{title}</h2>
        <p className='lead'>{author}</p>
        <p className='lead'>{`${category} | ${language} | ${condition}`}</p>
      </div>
      <div className='card-footer text-right'>
        {currentUser._id === owner ? (
          <Link to='/book-details'>
            <CustomButton
              small
              primary
              outline
              onClick={() => setSelectedItem(book)}
            >
              Edit Book
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
              onClick={() => setSelectedItem(book)}
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
)(BookCard);
