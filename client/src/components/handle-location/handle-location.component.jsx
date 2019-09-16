import React, { Fragment } from 'react';
import Autocomplete from 'react-google-autocomplete';

import { fetchLatLng } from '../../assets/util-functions';

import CustomButton from '../custom-button/custom-button.component';

import './handle-location.styles.scss';

class HandleLocation extends React.Component {
  state = {
    latitude: this.props.latitude,
    longitude: this.props.longitude,
    address: '',
    isEditing: false
  };

  async componentDidMount() {
    const { latitude, longitude } = this.state;
    if (latitude && longitude) {
      this.setState({ address: await fetchLatLng(latitude, longitude) });
    }
  }

  handleSelectCurrentPlace = async (latitude, longitude) => {
    this.props.updateLocation(latitude, longitude);
    this.setState({
      latitude,
      longitude,
      address: await fetchLatLng(latitude, longitude),
      isEditing: false
    });
  };

  handleSelectPlace = (latitude, longitude, address) => {
    this.props.updateLocation(latitude, longitude);
    this.setState({ latitude, longitude, address, isEditing: false });
  };

  render() {
    const { address, isEditing } = this.state;

    return (
      <div className='form-row'>
        {!isEditing ? (
          <Fragment>
            <div className='col col-md-10 pr-2'>
              <h6>{address}</h6>
              {/* <FormInput value={address} readonly large /> */}
            </div>
            <div className='col col-md-2 pl-2'>
              <CustomButton
                outline
                primary
                onClick={() =>
                  this.setState({
                    latitude: null,
                    longitude: null,
                    address: '',
                    isEditing: true
                  })
                }
              >
                Change
              </CustomButton>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className='col col-md-10 pr-2'>
              <Autocomplete
                className='form-control form-control-lg'
                style={{ width: '100%', height: '40px' }}
                placeholder='enter location'
                onPlaceSelected={place => {
                  const latitude = place.geometry.location.lat();
                  const longitude = place.geometry.location.lng();
                  const address = place.formatted_address;

                  this.handleSelectPlace(latitude, longitude, address);
                }}
                types={['(regions)']}
                onKeyDown={e => {
                  if (e.keyCode === 13) {
                    e.preventDefault();
                  }
                }}
              />
            </div>

            <div className='col col-md-2 pl-2'>
              <CustomButton
                outline
                primary
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(
                    position => {
                      const { latitude, longitude } = position.coords;
                      this.handleSelectCurrentPlace(latitude, longitude);
                    },
                    err => console.log(err)
                  );
                }}
              >
                <i className='fas fa-street-view' /> Current
              </CustomButton>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default HandleLocation;
