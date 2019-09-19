import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({
  children,
  outline,
  primary,
  secondary,
  success,
  danger,
  warning,
  info,
  light,
  dark,
  small,
  block,
  large,
  disabled,
  type,
  className,
  ...props
}) => (
  <button
    className={`btn 
      ${primary && !outline && 'btn-primary'} 
      ${primary && outline && 'btn-outline-primary'} 
      ${secondary && !outline && 'btn-secondary'} 
      ${secondary && outline && 'btn-outline-secondary'} 
      ${success && !outline && 'btn-success'} 
      ${success && outline && 'btn-outline-success'} 
      ${danger && !outline && 'btn-danger'} 
      ${danger && outline && 'btn-outline-danger'} 
      ${warning && !outline && 'btn-warning'} 
      ${warning && outline && 'btn-outline-warning'} 
      ${info && !outline && 'btn-info'} 
      ${info && outline && 'btn-outline-info'} 
      ${light && !outline && 'btn-light'} 
      ${light && outline && 'btn-outline-light'} 
      ${dark && !outline && 'btn-dark'} 
      ${dark && outline && 'btn-outline-dark'} 
      ${small && 'btn-sm'} 
      ${large && 'btn-lg'} 
      ${block && 'btn-block'} 
      ${className && className}`}
    disabled={disabled ? true : false}
    type={type ? type : 'button'}
    {...props}
  >
    {children}
  </button>
);

export default CustomButton;
