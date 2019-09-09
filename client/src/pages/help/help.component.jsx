import React, { useState } from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './help.styles.scss';

const Help = ({ location: { pathname } }) => {
  const [email, setEmail] = useState('');
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const { oldPassword, newPassword, confirmNewPassword } = passwords;

  switch (pathname) {
    case '/help/forget-password':
      return (
        <div className='card col-md-6 mt-4 mx-auto'>
          <div className='card-body'>
            <h3 className='text-center mb-3'>Forget Password</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                // run action
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

    case '/help/change-password':
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

    default:
      return <div>This page can not be found</div>;
  }
};

export default Help;
