import React from 'react';

import chatPath from './imgs/chat.js';

// import chatImage from './imgs/chat.svg';
import editImage from './imgs/edit.svg';
import delImage from './imgs/del.svg';

import './custom-icon.styles.scss';

const CustomIcon = ({
  primary,
  secondary,
  dark,
  light,
  xs,
  sm,
  md,
  lg,
  xl,
  edit,
  chat,
  del,
  className
}) => {
  let source, size;
  if (chat) source = chatPath();
  if (edit) source = editImage;
  if (del) source = delImage;

  if (xs) size = 24;
  if (sm) size = 32;
  if (md) size = 48;
  if (lg) size = 64;
  if (xl) size = 96;

  return (
    // <img
    //   src={source}
    //   alt='icon'
    //   className={`
    //     ${primary && 'text-primary'}
    //     ${secondary && 'text-secondary'}
    //     ${dark && 'text-dark'}
    //     ${light && 'text-light'}
    //     ${xs && 'xs'}
    //     ${sm && 'sm'}
    //     ${md && 'md'}
    //     ${lg && 'lg'}
    //     ${xl && 'xl'}
    //     ${className && 'className'}
    //   `}
    // />
    <svg width={size} height={size} viewBox='0 0 24 24'>
      {source}
    </svg>
  );
};

export default CustomIcon;
