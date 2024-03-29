import React from 'react';

import './custom-image.styles.scss';

const CustomImage = ({ source, height, width, fit, ...props }) => {
  return (
    <img
      className='item-image'
      src={source}
      alt='item'
      {...props}
      style={{
        height: height && height,
        width: width && width,
        objectFit: fit && 'cover'
      }}
    />
  );
};

export default CustomImage;
