import React from 'react';
import Autocomplete from 'react-google-autocomplete';

import { fetchLatLng } from './handle-location.utils';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './handle-location.styles.scss';

class HandleLocation extends React.Component {
  // state = {
  //   latitude: props.latitude,
  //   longitude: props.longitude,
  //   address: ''
  // };

  state = {
    latitude: 25.1279484,
    longitude: 55.38626380000005,
    address: ''
  };

  async componentDidMount() {
    const { latitude, longitude } = this.state;
    if (!!latitude && !!longitude) {
      this.setState({ address: await fetchLatLng(latitude, longitude) });
    }
  }

  render() {
    const { latitude, longitude, address } = this.state;

    return (
      <div>
        {!!latitude && !!longitude ? (
          <div className='row mx-auto'>
            <div className='col-md-9'>
              <FormInput value={address} readonly large />
            </div>
            <div className='col-md-3'>
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
          </div>
        ) : (
          <div className='row mx-auto'>
            <div className='col-md-9'>
              <Autocomplete
                className='form-control form-control-lg'
                style={{ width: '100%' }}
                onPlaceSelected={place => {
                  this.setState({
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                    address: place.formatted_address
                  });
                  console.log(this.state);
                }}
                types={['(regions)']}
              />
            </div>

            <div className='col-md-3'>
              <CustomButton
                large
                outline
                primary
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(
                    async position => {
                      const { latitude, longitude } = position.coords;
                      this.setState({
                        latitude,
                        longitude,
                        address: await fetchLatLng(latitude, longitude)
                      });
                      // console.log(this.state);
                      // ! this.props.updateParentLocation(latitude, longitude)
                    },
                    err => console.log(err)
                  );
                }}
              >
                Current Location
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HandleLocation;
