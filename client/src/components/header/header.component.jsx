import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectUser } from '../../redux/current-user/current-user.selectors';

import UserImage from '../user-image/user-image.component';
import CustomButton from '../custom-button/custom-button.component';

import './header.styles.scss';

const Header = ({ currentUser }) => {
  return (
    <nav className='navbar navbar-light bg-light'>
      <span className='navbar-brand'>
        <i className='fas fa-book h1 d-inline' />
        <p className='h1 d-inline'> BOOKS OVERFLOW</p>
      </span>

      {currentUser ? (
        <div className='d-flex'>
          <div className='my-auto mr-2'>
            <CustomButton dark outline onClick={() => {}}>
              Notifications <span className='text-danger'>5</span>
            </CustomButton>
          </div>

          <div className='my-auto mr-2'>
            <CustomButton dark outline onClick={() => {}}>
              Messages <span className='text-danger'>9</span>
            </CustomButton>
          </div>

          <div className='my-auto mr-2'>
            <CustomButton dark outline onClick={() => {}}>
              Sign Out
            </CustomButton>
          </div>

          <Link to='/profile/me'>
            <UserImage small source={`api/avatars/${currentUser.avatarid}`} />
          </Link>
        </div>
      ) : (
        <Link to='/sign-in' className='my-auto mr-2'>
          <CustomButton dark outline>
            Sign In
          </CustomButton>
        </Link>
      )}
    </nav>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

export default connect(mapStateToProps)(Header);
