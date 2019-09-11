import React, { Fragment } from 'react';
import Autocomplete from 'react-google-autocomplete';

import { fetchLatLng } from './handle-location.utils';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './handle-location.styles.scss';

class HandleLocation extends React.Component {
  state = {
    latitude: this.props.latitude,
    longitude: this.props.longitude,
    address: ''
  };

  async componentDidMount() {
    const { latitude, longitude } = this.state;
    if (!!latitude && !!longitude) {
      this.setState({ address: await fetchLatLng(latitude, longitude) });
    }
  }

  handleSelectCurrentPlace = async (latitude, longitude) => {
    this.props.updateLocation(latitude, longitude);
    this.setState({
      latitude,
      longitude,
      address: await fetchLatLng(latitude, longitude)
    });
  };

  handleSelectPlace = (latitude, longitude, address) => {
    this.props.updateLocation(latitude, longitude);
    this.setState({ latitude, longitude, address });
  };

  render() {
    const { latitude, longitude, address } = this.state;

    return (
      <div className='form-row'>
        {!!latitude && !!longitude ? (
          <Fragment>
            <div className='col col-md-9'>
              <FormInput value={address} readonly large />
            </div>
            <div className='col col-md-3'>
              <CustomButton
                large
                outline
                primary
                onClick={() =>
                  this.setState({
                    latitude: null,
                    longitude: null,
                    address: ''
                  })
                }
              >
                Change Location
              </CustomButton>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className='col col-md-9'>
              <Autocomplete
                className='form-control form-control-lg'
                style={{ width: '100%' }}
                onPlaceSelected={place => {
                  const latitude = place.geometry.location.lat();
                  const longitude = place.geometry.location.lng();
                  const address = place.formatted_address;

                  this.handleSelectPlace(latitude, longitude, address);
                }}
                types={['(regions)']}
              />
            </div>

            <div className='col col-md-3'>
              <CustomButton
                large
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
                Current Location
              </CustomButton>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default HandleLocation;
