import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUser } from '../../redux/current-user/current-user.selectors';
import { contactUsStart } from '../../redux/contact-us/contact-us.actions';

import FormInput from '../../components/form-input/form-input.component';
import FormTextArea from '../../components/form-text-area/form-text-area.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './contact-us.styles.scss';

const ContactUs = ({ currentUser, contactUsStart }) => {
  const [data, setData] = useState({
    email: currentUser ? currentUser.email : '',
    subject: '',
    message: ''
  });

  const { email, subject, message } = data;

  const handleChange = e => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    contactUsStart(email, subject, message);

    setData({
      email: currentUser ? currentUser.email : '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className='card my-4'>
      <div className='card-body'>
        <form onSubmit={handleSubmit}>
          <FormInput
            large
            label='Email'
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
          <FormInput
            large
            label='Subject'
            text='text'
            name='subject'
            value={subject}
            onChange={handleChange}
            required
          />
          <FormTextArea
            large
            label='Message'
            name='message'
            value={message}
            onChange={handleChange}
            required
          />
          <div className='text-right'>
            <CustomButton large primary outline type='submit'>
              Send Email
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

const mapDispatchToProps = dispatch => ({
  contactUsStart: (email, subject, message) =>
    dispatch(contactUsStart(email, subject, message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs);
