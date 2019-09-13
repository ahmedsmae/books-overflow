import React from 'react';

import './custom-image.styles.scss';

const CustomImage = ({ source, ...props }) => {
  return <img className='item-image' src={source} alt='item' {...props} />;
};

export default CustomImage;
