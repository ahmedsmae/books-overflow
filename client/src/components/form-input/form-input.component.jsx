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
}) => {
  return (
    // MAIN CONTAINER
    <div
      className={`
        ${prepend ? 'input-group mb-3' : 'form-group'} 
        ${prepend && small && 'input-group-sm'} 
        ${prepend && !small && !large && ''} 
        ${prepend && large && 'input-group-lg'} 
      `}
    >
      {/* LABEL */}
      {label && <label>{label}</label>}

      {/* PREPAND */}
      {prepend && (
        <div className='input-group-prepend'>
          <span
            className='input-group-text'
            id={`
              ${small && 'inputGroup-sizing-sm'} 
              ${!small && !large && 'inputGroup-sizing-default'} 
              ${large && 'inputGroup-sizing-lg'} 
            `}
          >
            {prepend}
          </span>
        </div>
      )}

      {/* INPUT */}
      <input
        className={`
          form-control  
          ${large && 'form-control-lg'} 
          ${small && 'form-control-sm'} 
          `}
        readOnly={readonly ? true : false}
        type={type ? type : 'text'}
        aria-describedby={`
          ${prepend && small && 'inputGroup-sizing-sm'} 
          ${prepend && !small && !large && 'inputGroup-sizing-default'} 
          ${prepend && large && 'inputGroup-sizing-sm'} 
        `}
        {...props}
      />

      {/* HINT */}
      {hint && <small className='form-text text-muted'>{hint}</small>}
    </div>
  );
};

export default FormInput;
