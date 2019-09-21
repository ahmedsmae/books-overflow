import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';

import {
  selectUser,
  selectUserFavourtiteIds
} from '../../redux/current-user/current-user.selectors';
import { selectGetPriceInLocalCurrency } from '../../redux/conversion-rates/conversion-rates.selectors';
import {
  setSelectedItem,
  addFavouriteStart,
  removeFavouriteStart,
  addBlockedUserStart
} from '../../redux/current-user/current-user.actions';
import { getChatStart } from '../../redux/chats/chats.actions';

import { PATHS } from '../../assets/list.types';
import { ITEM_TYPES } from '../../assets/item.types';
import { fetchLatLng } from '../../assets/util-functions';

import BlockReasonDialog from '../block-reason-dialog/block-reason-dialog.component';
import UserImage from '../user-image/user-image.component';
import CustomImage from '../custom-image/custom-image.component';
import CustomButton from '../custom-button/custom-button.component';

import './book-card.styles.scss';

const BookCard = ({
  book,
  currentUser,
  setSelectedItem,
  getPriceInLocalCurrency,
  favouriteIds,
  addFavouriteStart,
  removeFavouriteStart,
  addBlockedUserStart,
  getChatStart
}) => {
  const [showMore, setShowMore] = useState(false);
  const [address, setAddress] = useState('');
  const [showBlock, setShowBlock] = useState(false);
  const [zoom, setZoom] = useState({ isZoomed: false, imageIndex: null });
  const { isZoomed, imageIndex } = zoom;

  const {
    _id,
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

  let firstname, lastname, avatarid, ownerid;

  if (owner.firstname) {
    firstname = owner.firstname;
    lastname = owner.lastname;
    avatarid = owner.avatarid;
    ownerid = owner._id;
  } else {
    firstname = currentUser.firstname;
    lastname = currentUser.lastname;
    avatarid = currentUser.avatarid;
    ownerid = currentUser._id;
  }

  useEffect(() => {
    fetchLatLng(latitude, longitude).then(address => setAddress(address));
  }, [latitude, longitude]);

  const sourceArray = imageids.map(id => `/api/bookimages/${id}`);

  return (
    <div className='card my-2'>
      <div className='card-header bg-primary text-white'>
        <div className='row'>
          <div className='col'>
            <h4>{title}</h4>
          </div>
          <Fragment>
            {currentUser && currentUser._id === owner._id ? (
              <Link
                className='col-0.5 nav-link text-light text-center mr-2'
                to={PATHS.BOOK_DETAILS_PATH}
                onClick={() => setSelectedItem(book)}
              >
                <i className='fas fa-edit' />
              </Link>
            ) : (
              // NOT THE OWNER OF THE BOOK
              currentUser && (
                <Fragment>
                  <Link
                    to='#'
                    className='col-0.5 nav-link text-light text-center mr-2'
                    onClick={() =>
                      favouriteIds.includes(_id)
                        ? removeFavouriteStart(_id)
                        : addFavouriteStart(ITEM_TYPES.TYPE_BOOK, _id)
                    }
                  >
                    {favouriteIds.includes(_id) ? (
                      <i className='fas fa-star text-warning' />
                    ) : (
                      <i className='far fa-star' />
                    )}
                  </Link>
                  {/* TODO: CHECK IF U ARE REGISTERED BEFORE YOU CAN MESSAGE OWNER */}
                  <Link
                    to={PATHS.CURRENT_CHAT_PATH}
                    onClick={() => getChatStart(ownerid)}
                    className='col-0.5 nav-link text-light text-center mr-2'
                  >
                    <i className='fas fa-comments' />
                  </Link>
                </Fragment>
              )
            )}
            <Link
              to='#'
              className='col-1.5 nav-link text-light text-center mr-2'
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Show less...' : 'Show more...'}
            </Link>
          </Fragment>
        </div>
      </div>

      <div className='card-body'>
        <div className='row'>
          <div className='col-3 text-center'>
            <Link
              to={
                currentUser && ownerid === currentUser._id
                  ? PATHS.MY_PROFILE_PATH
                  : PATHS.PROFILE_PATH_NO_ID + ownerid
              }
            >
              <UserImage source={`/api/avatars/${avatarid}`} medium />
              <p className='lead mt-3'>{`${firstname} ${lastname}`}</p>
            </Link>

            {/* You can't block urself */}
            {currentUser && ownerid !== currentUser._id && (
              <CustomButton
                small
                dark
                outline
                onClick={() => setShowBlock(true)}
              >
                Block User
              </CustomButton>
            )}
            {showBlock && (
              <BlockReasonDialog
                onCancel={() => setShowBlock(false)}
                onResonSelect={reason => addBlockedUserStart(ownerid, reason)}
              />
            )}
          </div>

          <div className='col'>
            <div>
              <small>Author: </small>
              <span className='lead'>{author}</span>
            </div>

            <hr />

            <div className='row'>
              <div className='col'>
                <small>Category</small>
                <p className='lead'>{category}</p>
              </div>
              <div className='col'>
                <small>Language</small>
                <p className='lead'>{language}</p>
              </div>
              <div className='col'>
                <small>Condition</small>
                <p className='lead'>{condition}</p>
              </div>
            </div>

            <hr />

            <div className='row'>
              <div className='col'>
                <small>Price: </small>
                <span className='lead'>{`${Math.round(
                  getPriceInLocalCurrency(price, currency),
                  0
                )} ${currency.toLowerCase()}`}</span>
              </div>
              <div className='col'>
                <small>How far: </small>
                <span className='lead'>{`${Math.round(
                  distance / 1000,
                  0
                )} km`}</span>
              </div>
            </div>
          </div>
        </div>
        {showMore && (
          <Fragment>
            <hr />
            <h5>{address}</h5>
            <hr />

            {sourceArray.map((src, index) => (
              <CustomImage
                key={index}
                source={src}
                height='100px'
                onClick={() => setZoom({ isZoomed: true, imageIndex: index })}
              />
            ))}

            <hr />

            <small>Summary</small>
            <p className='lead'>{summary}</p>

            <hr />

            <small>Keywords</small>
            <p className='lead'>{keywords}</p>
          </Fragment>
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
              ...zoom,
              imageIndex:
                (imageIndex + sourceArray.length - 1) % sourceArray.length
            })
          }
          onMoveNextRequest={() =>
            setZoom({
              ...zoom,
              imageIndex: (imageIndex + 1) % sourceArray.length
            })
          }
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: selectUser(state),
  getPriceInLocalCurrency: (price, toCurrency) =>
    selectGetPriceInLocalCurrency(price, toCurrency)(state),
  favouriteIds: selectUserFavourtiteIds(state)
});

const mapDispatchToProps = dispatch => ({
  setSelectedItem: item => dispatch(setSelectedItem(item)),
  addFavouriteStart: (kind, favouriteitemid) =>
    dispatch(addFavouriteStart(kind, favouriteitemid)),
  removeFavouriteStart: favouriteitemid =>
    dispatch(removeFavouriteStart(favouriteitemid)),
  addBlockedUserStart: (userid, reason) =>
    dispatch(addBlockedUserStart(userid, reason)),
  getChatStart: opponentid => dispatch(getChatStart(opponentid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookCard);
