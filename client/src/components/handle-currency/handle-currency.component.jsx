import React from 'react';
// import Select from 'react-select';
import Downshift from 'downshift';

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
          <div className='col col-md-12 row'>
            <div className='col'>
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
          </div>
        ) : (
          <Downshift
            onChange={selectedCurrency => {
              this.setState({ currency: selectedCurrency.label });
              this.props.updateCurrency(selectedCurrency.label);
            }}
            itemToString={item => (item ? item.value : '')}
          >
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem
            }) => (
              <div className='col col-md-12'>
                <FormInput
                  large
                  placeholder='enter currency'
                  prepend='Currency'
                  {...getInputProps()}
                />
                <ul
                  {...getMenuProps()}
                  // className='dropdown-menu'
                  style={{
                    height: isOpen && '100px',
                    overflowY: 'scroll',
                    scrollbarWidth: '1px'
                  }}
                >
                  {isOpen
                    ? currencyList
                        .filter(
                          item => !inputValue || item.value.includes(inputValue)
                        )
                        .map((item, index) => (
                          <li
                            className='dropdown-item'
                            {...getItemProps({
                              key: item.value,
                              index,
                              item,
                              style: {
                                backgroundColor:
                                  highlightedIndex === index
                                    ? 'lightgray'
                                    : 'white',
                                fontWeight:
                                  selectedItem === item ? 'bold' : 'normal'
                              }
                            })}
                          >
                            {item.label}
                          </li>
                        ))
                    : null}
                </ul>
              </div>
            )}
          </Downshift>
        )}
      </div>
    );
  }
}

export default HandleCurrency;
