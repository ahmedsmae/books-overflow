import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './confirm-dialog.styles.scss';

const ConfirmDialog = ({
  title,
  message,
  confirmText,
  cancelText,
  updateDisplay,
  onChoose
}) => {
  return (
    <div className='confirm-dialog-container '>
      <div className='card confirm-dialog'>
        <div className='card-header'>
          <div className='row'>
            <div className='col-md-11 text-left'>
              <h3>{title}</h3>
            </div>
            <div className='col-md-1 close'>
              <CustomButton
                small
                outline
                dark
                onClick={() => updateDisplay(false)}
              >
                X
              </CustomButton>
            </div>
          </div>
        </div>

        <div className='card-body text-left'>
          <p className='lead'>{message}</p>
        </div>

        <div className='card-footer'>
          <div className='row text-right'>
            <div className='col-md-2 m-2'>
              <CustomButton
                outline
                dark
                onClick={() => {
                  updateDisplay(false);
                  onChoose(false);
                }}
              >
                {cancelText || 'Cancel'}
              </CustomButton>
            </div>
            <div className='col-md-2 m-2'>
              <CustomButton
                outline
                danger
                onClick={() => {
                  updateDisplay(false);
                  onChoose(true);
                }}
              >
                {confirmText || 'Confirm'}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
