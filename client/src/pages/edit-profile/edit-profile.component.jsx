import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PATHS } from '../../assets/list.types';

import { selectUser } from '../../redux/current-user/current-user.selectors';
import { editUserProfileStart } from '../../redux/current-user/current-user.actions';

import FormInput from '../../components/form-input/form-input.component';
import FormTextArea from '../../components/form-text-area/form-text-area.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import HandleLocation from '../../components/handle-location/handle-location.component';
import HandleCurrency from '../../components/handle-currency/handle-currency.component';
import HandleImage from './handle-image.component';

import './edit-profile.styles.scss';

class EditProfile extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    createdAt: '',
    email: '',
    avatarid: '',
    contactnumber: '',
    defaultlatitude: '',
    defaultlongitude: '',
    defaultcurrency: '',
    bio: '',
    source: null,
    isImageSelected: false,
    crop: { aspect: 1 / 1, x: 10, y: 10, width: 250, height: 250 },
    profileChanged: false
  };

  static getDerivedStateFromProps(props, currentState) {
    if (props.currentUser) {
      return {
        firstname: props.currentUser.firstname,
        lastname: props.currentUser.lastname,
        createdAt: props.currentUser.createdAt,
        email: props.currentUser.email,
        avatarid: props.currentUser.avatarid,
        contactnumber: props.currentUser.contactnumber,
        defaultlatitude: props.currentUser.defaultlatitude,
        defaultlongitude: props.currentUser.defaultlongitude,
        defaultcurrency: props.currentUser.defaultcurrency,
        bio: props.currentUser.bio
      };
    }
    return null;
  }

  updateImage = source => {
    this.setState({ source, profileChanged: true }, () => {
      console.log(this.state.source);
    });
  };

  updateLocation = (latitude, longitude) => {
    this.setState(
      {
        defaultlatitude: latitude,
        defaultlongitude: longitude,
        profileChanged: true
      },
      () => {
        console.log(this.state.defaultlatitude, this.state.defaultlongitude);
      }
    );
  };

  updateCurrency = currency => {
    this.setState({ defaultcurrency: currency, profileChanged: true }, () => {
      console.log(this.state.defaultcurrency);
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value, profileChanged: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, ...otherInfo } = this.state;
    this.props.editUserProfileStart({ ...otherInfo });
  };

  render() {
    const {
      firstname,
      lastname,
      avatarid,
      email,
      contactnumber,
      defaultcurrency,
      defaultlatitude,
      defaultlongitude,
      bio
    } = this.state;

    console.log(defaultlatitude, defaultlongitude);

    return (
      <div className='card mt-4'>
        <div className='card-body'>
          <form onSubmit={this.handleSubmit}>
            <div className='row'>
              <div className='col-md-6 text-center pt-4'>
                <HandleImage
                  avatarid={avatarid}
                  updateImage={this.updateImage}
                />
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
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
                <FormInput
                  large
                  label='Contact Number'
                  type='text'
                  name='contactnumber'
                  value={contactnumber}
                  onChange={this.handleChange}
                />
                <HandleCurrency
                  originalCurrency={defaultcurrency}
                  updateCurrency={this.updateCurrency}
                />
              </div>
            </div>
            <div className='mt-3'>
              <HandleLocation
                updateLocation={this.updateLocation}
                latitude={defaultlatitude}
                longitude={defaultlongitude}
              />
            </div>
            <div className='mt-3'>
              <FormTextArea
                large
                rows='3'
                name='bio'
                value={bio}
                onChange={this.handleChange}
                label='About Yourself'
                placeholder='your bio...'
              />
            </div>
            <div className='text-right'>
              <Link to={PATHS.CHANGE_PASSWORD_PATH}>
                <CustomButton large danger>
                  Change Password
                </CustomButton>
              </Link>

              <CustomButton
                large
                primary
                type='submit'
                disabled={this.state.profileChanged ? false : true}
              >
                Save Changes
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

const mapDispatchToProps = dispatch => ({
  editUserProfileStart: userInfo => dispatch(editUserProfileStart(userInfo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
