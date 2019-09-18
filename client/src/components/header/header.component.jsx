import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectUser } from '../../redux/current-user/current-user.selectors';
import {
  signoutUserStart,
  clearSelectedItem
} from '../../redux/current-user/current-user.actions';
import { setAlert } from '../../redux/alert/alert.actions';

import { PATHS } from '../../assets/list.types';

import UserImage from '../user-image/user-image.component';
import CustomButton from '../custom-button/custom-button.component';
import Alert from '../alert/alert.component';

import './header.styles.scss';

const Header = ({
  currentUser,
  signoutUserStart,
  clearSelectedItem,
  setAlert
}) => {
  return (
    <nav className='navbar navbar-light bg-light'>
      <Link to={PATHS.HOME_PATH}>
        <span className='navbar-brand'>
          <i className='fas fa-book h1 d-inline' />
          <p className='h1 d-inline'> BOOKS OVERFLOW</p>
        </span>
      </Link>

      {currentUser ? (
        <div className='d-flex'>
          <div className='my-auto mr-2'>
            <CustomButton
              dark
              outline
              onClick={() => {
                setAlert(
                  'Family',
                  ['Mohamed', 'Ahmed Afifi', 'Moustafa', 'Minna'],
                  'danger',
                  5000
                );
              }}
            >
              <i className='fas fa-comments' /> Messages{' '}
              <span className='text-danger'>9</span>
            </CustomButton>
          </div>

          <Link to={PATHS.BOOK_DETAILS_PATH} className='my-auto mr-2'>
            <CustomButton
              dark
              outline
              onClick={() => {
                clearSelectedItem();
              }}
            >
              <i className='fas fa-plus' /> Book{' '}
            </CustomButton>
          </Link>

          <Link to={PATHS.COLLECTION_DETAILS_PATH} className='my-auto mr-2'>
            <CustomButton
              dark
              outline
              onClick={() => {
                clearSelectedItem();
              }}
            >
              <i className='fas fa-plus' /> Collection{' '}
            </CustomButton>
          </Link>

          <Link to={PATHS.MY_PROFILE_PATH}>
            <UserImage
              small
              source={
                currentUser.avatarid && `/api/avatars/${currentUser.avatarid}`
              }
            />
          </Link>

          <div className='my-auto ml-2'>
            <CustomButton dark outline onClick={() => signoutUserStart()}>
              <i className='fas fa-sign-out-alt' />
            </CustomButton>
          </div>
        </div>
      ) : (
        <Link to={PATHS.SIGN_IN_PATH} className='my-auto mr-2'>
          <CustomButton dark outline>
            Sign In
          </CustomButton>
        </Link>
      )}
      <Alert />
    </nav>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

const mapDispatchToProps = dispatch => ({
  signoutUserStart: () => dispatch(signoutUserStart()),
  clearSelectedItem: () => dispatch(clearSelectedItem()),
  setAlert: (msg, type, to) => dispatch(setAlert(msg, type, to))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
