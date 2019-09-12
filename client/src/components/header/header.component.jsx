import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectUser } from '../../redux/current-user/current-user.selectors';
import { signoutUserStart } from '../../redux/current-user/current-user.actions';

import UserImage from '../user-image/user-image.component';
import CustomButton from '../custom-button/custom-button.component';

import './header.styles.scss';

const Header = ({ currentUser, signoutUserStart }) => {
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
              <i className='fas fa-comments' /> Messages{' '}
              <span className='text-danger'>9</span>
            </CustomButton>
          </div>

          <Link to='/book-details' className='my-auto mr-2'>
            <CustomButton dark outline onClick={() => {}}>
              <i className='fas fa-plus' /> Book{' '}
            </CustomButton>
          </Link>

          <Link to='/collection-details' className='my-auto mr-2'>
            <CustomButton dark outline onClick={() => {}}>
              <i className='fas fa-plus' /> Collection{' '}
            </CustomButton>
          </Link>

          <Link to='/profile/me'>
            <UserImage small source={`api/avatars/${currentUser.avatarid}`} />
          </Link>

          <div className='my-auto ml-2'>
            <CustomButton dark outline onClick={() => signoutUserStart()}>
              <i className='fas fa-sign-out-alt' />
            </CustomButton>
          </div>
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

const mapDispatchToProps = dispatch => ({
  signoutUserStart: () => dispatch(signoutUserStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
