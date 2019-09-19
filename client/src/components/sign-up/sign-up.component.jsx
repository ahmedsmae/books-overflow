import React, { useState } from 'react';
import { connect } from 'react-redux';

import { signupUserStart } from '../../redux/current-user/current-user.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';

const SignUp = ({ signupUserStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const {
    firstname,
    lastname,
    email,
    password,
    confirmPassword
  } = userCredentials;

  const handleChange = e => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert('Passwords shoild be identical');
    }

    signupUserStart(userCredentials);
  };

  return (
    <div className='card m-4'>
      <div className='card-body'>
        <h3 className='text-center'>Sign Up</h3>
        <p className='lead text-center mb-4'>
          Sign up with your name, email and password
        </p>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col'>
              <FormInput
                large
                label='First Name'
                placeholder='enter first name'
                type='text'
                name='firstname'
                value={firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className='col'>
              <FormInput
                large
                label='Last Name'
                placeholder='enter last name'
                type='text'
                name='lastname'
                value={lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <FormInput
            large
            label='Email'
            hint='you should enter a valid email'
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
            hint='should be at least 7 charachters and does not contain the word "password"'
            placeholder='enter password'
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            required
          />
          <FormInput
            large
            label='Confirm Password'
            placeholder='enter password'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            required
          />

          <CustomButton type='submit' secondary large block outline>
            Sign Up
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signupUserStart: userCredentials => dispatch(signupUserStart(userCredentials))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
