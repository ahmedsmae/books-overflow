import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { PATHS } from '../../assets/list.types';

import { signinUserStart } from '../../redux/current-user/current-user.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';

const SignIn = ({ signinUserStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  });

  const { email, password } = userCredentials;

  const handleChange = e => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    signinUserStart(userCredentials);
  };

  return (
    <div className='card m-4'>
      <div className='card-body'>
        <h3 className='text-center'>Sign In</h3>
        <p className='lead text-center mb-4'>
          Sign in with your email and password
        </p>
        <form onSubmit={handleSubmit}>
          <FormInput
            large
            label='Email'
            placeholder='enter email'
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
          <FormInput
            large
            label='Password'
            placeholder='enter password'
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            required
          />

          <CustomButton type='submit' secondary large block outline>
            Sign In
          </CustomButton>
        </form>

        <Link to={PATHS.FORGET_PASSWORD_PATH}>
          <div className='text-center mt-3 p-1'>Forget Password ?</div>
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signinUserStart: userCredentials => dispatch(signinUserStart(userCredentials))
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
