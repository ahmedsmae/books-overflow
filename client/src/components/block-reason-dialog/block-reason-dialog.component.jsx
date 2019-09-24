import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectBlockReasons } from '../../redux/constants/constants.selectors';
import FormSelect from '../form-select/form-select.component';

import './block-reason-dialog.styles.scss';

const BlockReasonDialog = ({ blockReasons, onResonSelect, onCancel }) => {
  return (
    <div className='confirm-dialog-container'>
      <div className='card confirm-dialog'>
        <div className='card-body'>
          <div className='row'>
            <div className='col'>
              <p className='lead text-dark'>
                Please select the most valid reason why do you want to block
                this user.
              </p>
            </div>
            <Link
              to='#'
              className='col-0.5 nav-link mr-1'
              onClick={() => onCancel()}
            >
              <i className='fas fa-power-off' />
            </Link>
          </div>
          <FormSelect
            list={blockReasons}
            onChange={e => onResonSelect(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  blockReasons: selectBlockReasons
});

export default connect(mapStateToProps)(BlockReasonDialog);
