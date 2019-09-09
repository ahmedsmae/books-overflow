import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUp = () => {
  return (
    <div className='row'>
      <div className='col-md-6'>
        <SignIn />
      </div>
      <div className='col-md-6'>
        <SignUp />
      </div>
    </div>
  );
};

export default SignInAndSignUp;
