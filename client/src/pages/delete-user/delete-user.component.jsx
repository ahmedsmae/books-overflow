import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUser } from '../../redux/current-user/current-user.selectors';
import { selectReasons } from '../../redux/constants/constants.selectors';
import { deleteUserStart } from '../../redux/current-user/current-user.actions';

import FormSelect from '../../components/form-select/form-select.component';
import FormTextArea from '../../components/form-text-area/form-text-area.component';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './delete-user.styles.scss';

const DeleteUser = ({ currentUser, reasons, deleteUserStart }) => {
  const [explanation, setExplanation] = useState({
    reason: '',
    details: '',
    email: '',
    password: ''
  });
  const { reason, details, email, password } = explanation;

  const handleChange = e => {
    const { name, value } = e.target;
    setExplanation({ ...explanation, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    deleteUserStart(explanation);
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <h3 className='text-center'>
          This is Unfortunate {currentUser.firstname}
        </h3>
        <p className='lead'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
          ea architecto excepturi adipisci deserunt suscipit, fuga iste neque
          exercitationem in ipsa iusto molestias? Aperiam error molestiae
          commodi illo deleniti nihil!
        </p>
        <hr />
        <form onSubmit={handleSubmit}>
          <h3>Help us to get better</h3>
          <FormSelect
            label='Please choose a reason why you are leaving us'
            list={['Select ...', ...reasons]}
            name='reason'
            value={reason}
            onChange={handleChange}
            required
          />
          <FormTextArea
            placeholder='have more to say ?'
            name='details'
            value={details}
            onChange={handleChange}
          />
          <hr />
          <h3>Confirm your credentials</h3>
          <div className='row'>
            <div className='col-md-6'>
              <FormInput
                type='email'
                label='Your registration email'
                name='email'
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='col-md-6'>
              <FormInput
                type='password'
                label='Your password'
                name='password'
                value={password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <CustomButton block danger type='submit'>
            {' '}
            DELETE USER{' '}
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser,
  reasons: selectReasons
});

const mapDispatchToProps = dispatch => ({
  deleteUserStart: explanation => dispatch(deleteUserStart(explanation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteUser);
