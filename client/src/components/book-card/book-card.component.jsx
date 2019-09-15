import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Lightbox from 'react-image-lightbox';

import { selectUser } from '../../redux/current-user/current-user.selectors';
import { setSelectedItem } from '../../redux/current-user/current-user.actions';

import { PATHS } from '../../assets/list.types';
import { fetchLatLng } from '../../assets/util-functions';

import CustomButton from '../custom-button/custom-button.component';
import UserImage from '../user-image/user-image.component';
import CustomImage from '../custom-image/custom-image.component';

import './book-card.styles.scss';

const BookCard = ({ book, currentUser, setSelectedItem }) => {
  const [showMore, setShowMore] = useState(false);
  const [address, setAddress] = useState('');
  const [zoom, setZoom] = useState({ isZoomed: false, imageIndex: null });
  const { isZoomed, imageIndex } = zoom;

  const {
    owner,
    // status,
    title,
    author,
    // publishdate,
    category,
    language,
    summary,
    condition,
    price,
    currency,
    latitude,
    longitude,
    distance,
    keywords,
    imageids
  } = book;

  let firstname, lastname, avatarid;

  if (owner.firstname) {
    firstname = owner.firstname;
    lastname = owner.lastname;
    avatarid = owner.avatarid;
  } else {
    firstname = currentUser.firstname;
    lastname = currentUser.lastname;
    avatarid = currentUser.avatarid;
  }

  useEffect(() => {
    fetchLatLng(latitude, longitude).then(address => setAddress(address));
  }, [latitude, longitude]);

  const sourceArray = imageids.map(id => `/api/bookimages/${id}`);

  return (
    <div className='card m-3'>
      <div className='card-header'>
        <div className='row'>
          <div className='col-md-10'>
            <h3>{title}</h3>
          </div>
          <div className='col-md-2'>
            {currentUser._id === owner._id ? (
              <Link to={PATHS.BOOK_DETAILS_PATH}>
                <CustomButton
                  primary
                  outline
                  onClick={() => setSelectedItem(book)}
                >
                  <i className='fas fa-edit' /> Edit Book
                </CustomButton>
              </Link>
            ) : (
              // NOT THE OWNER OF THE BOOK
              currentUser && (
                // TODO: CHECK IF U ARE REGISTERED BEFORE YOU CAN MESSAGE THE OWNER
                <Link to=''>
                  <CustomButton primary outline onClick={() => {}}>
                    <i className='fas fa-comments' /> Message Owner
                  </CustomButton>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='col-md-3'>
            <UserImage source={`api/avatars/${avatarid}`} medium />
            <h6>{`${firstname} ${lastname}`}</h6>
          </div>

          <div className='col-md-9'>
            <h6>{author}</h6>
            <h5>{`${category} | ${language} | ${condition}`}</h5>

            <div className='row'>
              <div className='col-md-10'>
                <h5>
                  <i className='fas fa-dollar-sign' />{' '}
                  {`${price} ${currency.toLowerCase()}`} |{' '}
                  <i className='fas fa-map-marker-alt' />{' '}
                  {`${Math.round(distance / 1000, 0)} km`}
                </h5>
              </div>
              <div className='col-md-2'>
                <CustomButton
                  primary
                  outline
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? (
                    <i className='fas fa-chevron-up'></i>
                  ) : (
                    <i className='fas fa-chevron-down' />
                  )}
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
        {showMore && (
          <div>
            <hr />
            <div className='row'>
              <div className='col-md-8'>
                {/* get location from lat lng */}
                <h5>{address}</h5>
                <p>{summary}</p>
                <h6>{keywords}</h6>
              </div>
              <div className='col-md-4'>
                {sourceArray.map((src, index) => (
                  <CustomImage
                    key={index}
                    source={src}
                    height='100px'
                    onClick={() =>
                      setZoom({ isZoomed: true, imageIndex: index })
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {isZoomed && (
        <Lightbox
          mainSrc={sourceArray[imageIndex]}
          nextSrc={sourceArray[(imageIndex + 1) % sourceArray.length]}
          prevSrc={
            sourceArray[
              (imageIndex + sourceArray.length - 1) % sourceArray.length
            ]
          }
          onCloseRequest={() => setZoom({ ...zoom, isZoomed: false })}
          onMovePrevRequest={() =>
            setZoom({
              imageIndex: (imageIndex + 1) % sourceArray.length
            })
          }
          onMoveNextRequest={() =>
            setZoom({
              ...zoom,
              imageIndex:
                (imageIndex + sourceArray.length - 1) % sourceArray.length
            })
          }
        />
      )}
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
