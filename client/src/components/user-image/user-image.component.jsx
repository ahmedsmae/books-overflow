import React from 'react';

import BlankUser from '../../assets/user.png';

import './user-image.styles.scss';

const UserImage = ({ source, xsmall, small, medium, large, className }) => {
  return (
    <img
      className={`rounded-circle 
          ${small && 'small'} 
          ${xsmall && 'xsmall'} 
          ${medium && 'medium'} 
          ${large && 'large'} 
          ${className && 'className'} 
          `}
      alt='user'
      src={source ? source : BlankUser}
    />
  );
};

export default UserImage;
