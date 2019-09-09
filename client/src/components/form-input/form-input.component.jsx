import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ label, hint, large, small, readonly, ...props }) => (
  <div className={`form-group mb-3`}>
    {label && <label>{label}</label>}
    <input
      className={`form-control 
        ${large && 'form-control-lg'} 
        ${small && 'form-control-sm'}`}
      readOnly={readonly ? true : false}
      {...props}
    />
    {hint && <small className='form-text text-muted'>{hint}</small>}
  </div>
);

export default FormInput;
