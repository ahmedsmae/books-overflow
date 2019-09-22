import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Moment from 'react-moment';
import moment from 'moment';

import { PATHS } from '../../assets/list.types';

import {
  selectUser,
  selectUnseenNotificationsCount
} from '../../redux/current-user/current-user.selectors';
import { selectSelectedUser } from '../../redux/selected-user/selected-user.selectors';

import { fetchLatLng } from '../../assets/util-functions';
import UserImage from '../user-image/user-image.component';
import CustomButton from '../custom-button/custom-button.component';

import './user-card.styles.scss';

const UserCard = ({
  myProfile,
  selectedUser,
  currentUser,
  unseenNoticationsCount
}) => {
  const [address, setAddress] = useState('');

  let _id,
    avatarid,
    firstname,
    lastname,
    email,
    defaultlatitude,
    defaultlongitude,
    createdAt,
    bio;

  useEffect(() => {
    defaultlatitude &&
      defaultlongitude &&
      fetchLatLng(defaultlatitude, defaultlongitude).then(add =>
        setAddress(add)
      );
  }, [defaultlongitude, defaultlatitude]);

  if (myProfile) {
    _id = currentUser._id;
    firstname = currentUser.firstname;
    lastname = currentUser.lastname;
    avatarid = currentUser.avatarid;
    email = currentUser.email;
    defaultlatitude = currentUser.defaultlatitude;
    defaultlongitude = currentUser.defaultlongitude;
    createdAt = currentUser.createdAt;
    bio = currentUser.bio;
  } else {
    _id = selectedUser._id;
    firstname = selectedUser.firstname;
    lastname = selectedUser.lastname;
    avatarid = selectedUser.avatarid;
    email = selectedUser.email;
    defaultlatitude = selectedUser.defaultlatitude;
    defaultlongitude = selectedUser.defaultlongitude;
    createdAt = selectedUser.createdAt;
    bio = selectedUser.bio;
  }

  return (
    <div className='card'>
      <div className='card-body bg-dark text-white'>
        <div className='row'>
          <div className='col-md-4 text-center'>
            <UserImage large source={avatarid && `/api/avatars/${avatarid}`} />
          </div>

          <div className='col-md-8'>
            <h1 className='display-4'>{`${firstname} ${lastname}`}</h1>

            <p className='lead'>{email}</p>

            {address.length && <p className='lead'>{address}</p>}

            <p className='lead'>
              Joined since:{' '}
              <Moment format='YYYY/MM/DD'>{moment.utc(createdAt)}</Moment>
            </p>
          </div>
        </div>
        <p className='lead mt-4 d-block'>{bio && bio}</p>

        <hr />

        <div className='row'>
          <Link
            className='col m-2'
            to={
              myProfile ? PATHS.MY_LIBRARY_PATH : PATHS.LIBRARY_PATH_NO_ID + _id
            }
          >
            <CustomButton primary outline className='w-100'>
              <i className='fas fa-book' />
              {myProfile ? ' My ' : ` ${firstname}'s `}
              Library
            </CustomButton>
          </Link>

          {myProfile && (
            <Fragment>
              <Link to={PATHS.FAVOURITES_PATH} className='col m-2'>
                <CustomButton primary outline className='w-100'>
                  <i className='fas fa-star text-warning' /> My Favourites
                </CustomButton>
              </Link>

              <Link to={PATHS.NOTIFICATIONS_PATH} className='col m-2'>
                <CustomButton warning outline className='w-100'>
                  <i className='fas fa-clipboard' /> Notifications{' '}
                  {unseenNoticationsCount > 0 && (
                    <span className='text-danger'>
                      {unseenNoticationsCount}
                    </span>
                  )}
                </CustomButton>
              </Link>

              <Link to={PATHS.BLOCKED_USERS_PATH} className='col m-2'>
                <CustomButton danger outline className='w-100'>
                  <i className='fas fa-user-lock' /> Blocked Users
                </CustomButton>
              </Link>

              <Link to={PATHS.EDIT_PROFILE_PATH} className='col m-2'>
                <CustomButton primary outline className='w-100'>
                  <i className='fas fa-edit' /> Edit Profile
                </CustomButton>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser,
  selectedUser: selectSelectedUser,
  unseenNoticationsCount: selectUnseenNotificationsCount
});

export default connect(mapStateToProps)(UserCard);
