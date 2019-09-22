import React from 'react';

import './form-input.styles.scss';

const FormInput = ({
  label,
  hint,
  type,
  large,
  small,
  prepend,
  readonly,
  ...props
}) => (
  // ? you should use either 'prepend' or 'label'

  <div className={prepend ? 'input-group mb-3' : 'form-group'}>
    {label && <label>{label}</label>}
    {prepend && (
      <div className='input-group-prepend'>
        <span className='input-group-text' id='basic-addon1'>
          {prepend}
        </span>
      </div>
    )}
    <input
      className={`form-control 
        ${large && 'form-control-lg'} 
        ${small && 'form-control-sm'}`}
      readOnly={readonly ? true : false}
      aria-describedby={prepend && 'basic-addon1'}
      type={type ? type : 'text'}
      {...props}
    />
    {hint && <small className='form-text text-muted'>{hint}</small>}
  </div>
);

export default FormInput;
