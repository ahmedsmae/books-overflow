import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectUser } from '../../redux/current-user/current-user.selectors';
import {
  signoutUserStart,
  clearSelectedItem
} from '../../redux/current-user/current-user.actions';

import { PATHS } from '../../assets/list.types';

import UserImage from '../user-image/user-image.component';
import Alert from '../alert/alert.component';

import './header.styles.scss';

const Header = ({ currentUser, signoutUserStart, clearSelectedItem }) => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-3'>
      <div className='container'>
        <Link to={PATHS.HOME_PATH} className='navbar-brand'>
          <span className='h4 align-bottom'>
            <i className='fas fa-book' /> BOOKS OVERFLOW
          </span>
        </Link>

        {currentUser ? (
          <ul className='navbar-nav'>
            <li className='nav-item mr-2'>
              <Link to='#' className='nav-link align-bottom' onClick={() => {}}>
                <i className='fas fa-comments' /> Messages{' '}
                <span className='text-danger'>9</span>
              </Link>
            </li>

            <li className='nav-item mr-2'>
              <Link
                to={PATHS.BOOK_DETAILS_PATH}
                className='nav-link align-bottom'
                onClick={() => {
                  clearSelectedItem();
                }}
              >
                <i className='fas fa-plus' /> Book{' '}
              </Link>
            </li>

            <li className='nav-item mr-2'>
              <Link
                to={PATHS.COLLECTION_DETAILS_PATH}
                className='nav-link align-bottom'
                onClick={() => {
                  clearSelectedItem();
                }}
              >
                <i className='fas fa-plus' /> Collection{' '}
              </Link>
            </li>

            <li className='nav-item mr-2'>
              <Link to={PATHS.MY_PROFILE_PATH}>
                <UserImage
                  small
                  source={
                    currentUser.avatarid &&
                    `/api/avatars/${currentUser.avatarid}`
                  }
                />
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='#'
                className='nav-link align-bottom'
                onClick={() => signoutUserStart()}
              >
                <i className='fas fa-sign-out-alt' />
              </Link>
            </li>
          </ul>
        ) : (
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link to={PATHS.SIGN_IN_PATH} className='nav-link align-bottom'>
                Sign In
              </Link>
            </li>
          </ul>
        )}
        <Alert />
      </div>
    </nav>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

const mapDispatchToProps = dispatch => ({
  signoutUserStart: () => dispatch(signoutUserStart()),
  clearSelectedItem: () => dispatch(clearSelectedItem())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
