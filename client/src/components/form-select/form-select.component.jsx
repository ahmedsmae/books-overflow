import React from 'react';

import './form-select.styles.scss';

const FormSelect = ({ label, hint, large, small, list, prepend, ...props }) => {
  return (
    <div className={`${prepend ? 'input-group mb-3' : 'form-group'}`}>
      {label && <label>{label}</label>}

      {prepend && (
        <div className='input-group-prepend'>
          <span className='input-group-text'>{prepend}</span>
        </div>
      )}

      <select
        className={`form-control 
          ${large && 'form-control-lg'} 
          ${small && 'form-control-sm'}`}
        {...props}
      >
        {list.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>

      {hint && <small className='form-text text-muted'>{hint}</small>}
    </div>
  );
};

export default FormSelect;
