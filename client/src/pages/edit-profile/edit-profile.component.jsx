import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUser } from '../../redux/current-user/current-user.selectors';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import HandleLocation from '../../components/handle-location/handle-location.component';
import HandleImage from './handle-image.component';

import './edit-profile.styles.scss';

const EditProfile = ({ currentUser }) => {
  const [userInfo, setUserInfo] = useState({ ...currentUser });
  const {
    firstname,
    lastname,
    createdAt,
    email,
    avatarid,
    contactnumber,
    defaultlatitude,
    defaultlongitude,
    defaultcurrency,
    bio
  } = userInfo;

  const [image, setImage] = useState({
    source: `api/avatars/${avatarid}`,
    isImageSelected: false,
    crop: { aspect: 1 / 1, x: 10, y: 10, width: 250, height: 250 }
  });
  console.log(image);

  const updateImage = (name, value) => {
    setImage({ ...image, [name]: value });
  };

  const updateLocation = (lat, lng) => {
    setUserInfo({ ...userInfo, defaultlatitude: lat, defaultlongitude: lng });
    console.log(defaultlatitude, defaultlongitude);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // run action
  };

  return (
    <div className='card mt-4'>
      <div className='card-body'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-6 text-center'>
              <HandleImage avatarid={avatarid} updateImage={updateImage} />
            </div>
            <div className='col-md-6'>
              <div className='form-row'>
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
                disabled
                large
                label='Email'
                type='email'
                name='email'
                value={email}
              />
            </div>
          </div>
          <HandleLocation
            updateLocation={updateLocation}
            location={{
              latitude: defaultlatitude,
              longitude: defaultlongitude
            }}
          />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
