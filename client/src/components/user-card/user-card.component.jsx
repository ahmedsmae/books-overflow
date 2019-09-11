import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import UserImage from '../user-image/user-image.component';
import CustomButton from '../custom-button/custom-button.component';

import './user-card.styles.scss';

/**
 * @action - display the suitable render and design for your user data or other users
 * @param {myProfile} - true or false
 * @param {user} - the user data
 */
const UserCard = ({
  myProfile,
  user: {
    firstname,
    lastname,
    email,
    avatarid,
    bio,
    defaultlatitude,
    defaultlongitude,
    createdAt
  }
}) => {
  return (
    <div className='card mt-4 mx-auto'>
      <div className='card-body'>
        <div className='row'>
          <div className='col-md-6 text-center'>
            <UserImage large source={`/api/avatars/${avatarid}`} />
          </div>

          <div className='col-md-6'>
            <h1>{`${firstname} ${lastname}`}</h1>

            <h3>{email}</h3>

            <h3>{`${defaultlatitude} ${defaultlongitude}`}</h3>

            <p>
              <small>{`Join Date: ${createdAt}`}</small>
            </p>

            <p className='lead mt-4'>{bio}</p>
          </div>
          <div className='mx-auto mt-4'>
            <Link to='/my-library' className='mx-3'>
              <CustomButton primary>
                <i className='fas fa-book' />
                {myProfile ? ' My ' : ` ${firstname}'s `}
                Library
              </CustomButton>
            </Link>

            <Link to='/my-favourites' className='mx-3'>
              <CustomButton primary>
                <i className='fas fa-star text-warning' />
                {myProfile ? ' My ' : ` ${firstname}'s `}
                Favourites
              </CustomButton>
            </Link>

            {myProfile && (
              <Fragment>
                <Link to='my-notifications' className='mx-3'>
                  <CustomButton warning>
                    <i className='fas fa-clipboard' /> Notifications{' '}
                    <span className='text-danger'>5</span>
                  </CustomButton>
                </Link>

                <Link to='/my-blocked-users' className='mx-3'>
                  <CustomButton danger>
                    <i className='fas fa-user-lock' /> Blocked Users
                  </CustomButton>
                </Link>

                <Link to='/edit-profile' className='mx-3'>
                  <CustomButton primary>
                    <i className='fas fa-edit' /> Edit Profile
                  </CustomButton>
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
