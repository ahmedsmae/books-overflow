import React from 'react';
import { Link } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';

import './confirm-dialog.styles.scss';

const ConfirmDialog = ({
  title,
  message,
  confirmText,
  cancelText,
  onChoose
}) => {
  return (
    <div className='confirm-dialog-container '>
      <div className='card confirm-dialog'>
        <div className='card-header'>
          <div className='row'>
            <div className='col'>
              <h4>{title}</h4>
            </div>
            <Link
              to='#'
              className='col-0.5 nav-link mr-1'
              onClick={() => onChoose(false)}
            >
              <i className='fas fa-power-off' />
            </Link>
          </div>
        </div>

        <div className='card-body'>
          <p className='lead'>{message}</p>
        </div>

        <div className='card-footer'>
          <div className='row'>
            <div className='col' />
            <CustomButton
              className='col-2 m-2'
              dark
              onClick={() => onChoose(false)}
            >
              {cancelText || 'Cancel'}
            </CustomButton>
            <CustomButton
              className='col-2 m-2'
              danger
              onClick={() => onChoose(true)}
            >
              {confirmText || 'Confirm'}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
