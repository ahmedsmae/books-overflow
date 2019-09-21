import React from 'react';

import BlankUser from '../../assets/user.png';

import './user-image.styles.scss';

const UserImage = ({ source, xsmall, small, medium, large }) => {
  return (
    <div>
      <img
        className={`rounded-circle 
          ${small && 'small'} 
          ${xsmall && 'xsmall'} 
          ${medium && 'medium'} 
          ${large && 'large'}
          `}
        alt='user'
        src={source ? source : BlankUser}
      />
    </div>
  );
};

export default UserImage;
