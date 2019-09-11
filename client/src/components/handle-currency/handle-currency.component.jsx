import React, { Fragment } from 'react';
import Select from 'react-select';

import { getCurrencyList } from './handle-currency.utils';

import './handle-currency.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class HandleCurrency extends React.Component {
  state = {
    currency: this.props.originalCurrency ? this.props.originalCurrency : '',
    currencyList: []
  };

  async componentDidMount() {
    this.setState({ currencyList: await getCurrencyList() });
  }

  render() {
    const { currency, currencyList } = this.state;

    return (
      <div className='form-row'>
        {!!currency ? (
          <Fragment>
            <div className='col px-auto'>
              <FormInput large value={currency} readonly />
            </div>
            <div className='col'>
              <CustomButton
                primary
                outline
                large
                onClick={() => {
                  this.setState({ currency: '' });
                }}
              >
                Change Currency
              </CustomButton>
            </div>
          </Fragment>
        ) : (
          // ! react-select using legacy life cycles
          <Select
            className='col form-control-lg'
            styles={{ margin: '0' }}
            value={currency}
            placeholder='Select Currency'
            onChange={selectedCurrency => {
              this.setState({ currency: selectedCurrency.label });
              this.props.updateCurrency(selectedCurrency.label);
            }}
            options={currencyList}
          />
        )}
      </div>
    );
  }
}

export default HandleCurrency;
