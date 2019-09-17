import React, { useState } from 'react';
import { connect } from 'react-redux';

import { forgetPasswordStart } from '../../redux/current-user/current-user.actions';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './forget-password.styles.scss';

const ForgetPassword = ({ forgetPasswordStart }) => {
  const [email, setEmail] = useState('');

  return (
    <div className='card col-md-6 mt-4 mx-auto'>
      <div className='card-body'>
        <h3 className='text-center mb-3'>Forget Password</h3>
        <form
          onSubmit={e => {
            e.preventDefault();
            forgetPasswordStart(email);
          }}
        >
          <FormInput
            large
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='enter email'
            label='Your Mail Address'
            hint='new password will be sent to you in an email'
            required
          />
          <CustomButton type='submit' large block danger>
            Send New Password
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  forgetPasswordStart: email => dispatch(forgetPasswordStart(email))
});

export default connect(
  null,
  mapDispatchToProps
)(ForgetPassword);
