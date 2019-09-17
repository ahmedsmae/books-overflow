import React, { useState } from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './change-password.styles.scss';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const { oldPassword, newPassword, confirmNewPassword } = passwords;

  return (
    <div className='card col-md-6 mt-4 mx-auto'>
      <div className='card-body'>
        <h3 className='text-center mb-3'>Change Password</h3>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (newPassword !== confirmNewPassword) {
              return alert(
                'New password and Confirm new Password should be identical'
              );
            }

            // run action
          }}
        >
          <FormInput
            large
            type='password'
            value={oldPassword}
            onChange={e =>
              setPasswords({ ...passwords, oldPassword: e.target.value })
            }
            placeholder='enter old password'
            label='Old Password'
            required
          />
          <FormInput
            large
            type='password'
            value={newPassword}
            onChange={e =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
            placeholder='enter new password'
            label='New Password'
            hint='should be at least 7 charachters and does not contain the word "password"'
            required
          />
          <FormInput
            large
            type='password'
            value={confirmNewPassword}
            onChange={e =>
              setPasswords({
                ...passwords,
                confirmNewPassword: e.target.value
              })
            }
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

export default ChangePassword;
