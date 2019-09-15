import React from 'react';

import './custom-image.styles.scss';

const CustomImage = ({ source, height, ...props }) => {
  return (
    <img
      className='item-image'
      src={source}
      alt='item'
      {...props}
      style={height && { height }}
    />
  );
};

export default CustomImage;
