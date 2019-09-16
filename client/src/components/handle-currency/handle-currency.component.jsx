import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Downshift from 'downshift';

import { selectCurrencies } from '../../redux/constants/constants.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './handle-currency.styles.scss';

class HandleCurrency extends React.Component {
  state = {
    currency: this.props.originalCurrency ? this.props.originalCurrency : '',
    currencyList: this.props.currencyList || []
  };

  componentDidMount() {
    this.setState({ currencyList: this.props.currencyList });
  }

  render() {
    const { currency, currencyList } = this.state;

    return (
      <div className='form-row'>
        {!!currency ? (
          <div className='row'>
            <div className='col'>
              <h6>{currency}</h6>
            </div>
            <div className='col'>
              <CustomButton
                primary
                outline
                onClick={() => {
                  this.setState({ currency: '' });
                }}
              >
                <i className='fas fa-pencil-alt' />
              </CustomButton>
            </div>
          </div>
        ) : (
          <Downshift
            onChange={selectedCurrency => {
              this.setState({ currency: selectedCurrency });
              this.props.updateCurrency(selectedCurrency);
            }}
            itemToString={item => (item ? item : '')}
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
                <FormInput placeholder='enter currency' {...getInputProps()} />
                <ul
                  {...getMenuProps()}
                  style={{
                    maxHeight: isOpen && '400px',
                    width: isOpen && '400px',
                    overflowY: 'scroll',
                    scrollbarWidth: '1px',
                    position: 'absolute',
                    zIndex: '1'
                  }}
                >
                  {isOpen
                    ? currencyList
                        .filter(
                          item =>
                            !inputValue.toUpperCase() ||
                            item.includes(inputValue.toUpperCase())
                        )
                        .map((item, index) => (
                          <li
                            className='dropdown-item'
                            {...getItemProps({
                              key: item,
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
                            {item}
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

const mapStateToProps = createStructuredSelector({
  currencyList: selectCurrencies
});

export default connect(mapStateToProps)(HandleCurrency);
