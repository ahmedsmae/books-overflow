import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectAlertHeader,
  selectAlertMessage,
  selectAlertDisplay,
  selectAlertTimeout,
  selectAlertType
} from '../../redux/alert/alert.selectors';
import { removeAlert } from '../../redux/alert/alert.actions';

import './alert.styles.scss';

const Alert = ({
  removeAlert,
  header,
  message,
  display,
  alertType,
  timeout
}) => {
  useEffect(() => {
    setTimeout(() => {
      removeAlert();
    }, timeout);
  }, [timeout, removeAlert]);

  return (
    display && (
      <div className='alert-container'>
        <div className={`myAlert-top alert alert-${alertType}`} role='alert'>
          <button className='close' onClick={() => removeAlert()}>
            &times;
          </button>
          {header && (
            <Fragment>
              <h4 className='alert-heading'>{header}</h4>
              <hr />
            </Fragment>
          )}
          {typeof message == 'string' ? (
            <p className='my-auto'>{message}</p>
          ) : (
            message &&
            message.map((msg, index) => (
              <div key={index}>
                <p className='my-auto'>{msg}</p>
                {index < message.length - 1 && <hr />}
              </div>
            ))
          )}
        </div>
      </div>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  header: selectAlertHeader,
  message: selectAlertMessage,
  display: selectAlertDisplay,
  alertType: selectAlertType,
  timeout: selectAlertTimeout
});

const mapDispatchToProps = dispatch => ({
  removeAlert: () => dispatch(removeAlert())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alert);
