import React, { useState } from 'react';
import { connect } from 'react-redux';

import { changePasswordStart } from '../../redux/current-user/current-user.actions';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './change-password.styles.scss';

const ChangePassword = ({ changePasswordStart }) => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const { oldPassword, newPassword, confirmNewPassword } = passwords;

  const handleChange = e => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      return alert('New password and Confirm new Password should be identical');
    }

    changePasswordStart(oldPassword, newPassword);
  };

  return (
    <div className='card col-md-6 mt-4 mx-auto'>
      <div className='card-body'>
        <h3 className='text-center mb-3'>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <FormInput
            large
            type='password'
            name='oldPassword'
            value={oldPassword}
            onChange={handleChange}
            placeholder='enter old password'
            label='Old Password'
            required
          />
          <FormInput
            large
            type='password'
            name='newPassword'
            value={newPassword}
            onChange={handleChange}
            placeholder='enter new password'
            label='New Password'
            hint='should be at least 7 charachters and does not contain the word "password"'
            required
          />
          <FormInput
            large
            type='password'
            name='confirmNewPassword'
            value={confirmNewPassword}
            onChange={handleChange}
            placeholder='confirm new password'
            label='Confirm New Password'
            required
          />
          <CustomButton type='submit' large block danger>
            Set New Password
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  changePasswordStart: (email, oldPassword, newPassword) =>
    dispatch(changePasswordStart(email, oldPassword, newPassword))
});

export default connect(
  null,
  mapDispatchToProps
)(ChangePassword);
