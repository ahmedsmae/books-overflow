import React from 'react';

const FormTextArea = ({
  label,
  hint,
  large,
  small,
  rows,
  readonly,
  ...props
}) => {
  return (
    <div className='form-group'>
      {label && <label>{label}</label>}
      <textarea
        className={`form-control 
        ${large && 'form-control-lg'} 
        ${small && 'form-control-sm'}`}
        rows={rows ? rows : '3'}
        readOnly={readonly ? true : false}
        {...props}
      ></textarea>
      {hint && <small className='form-text text-muted'>{hint}</small>}
    </div>
  );
};

export default FormTextArea;
