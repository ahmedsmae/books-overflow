import React from 'react';
import { connect } from 'react-redux';

import { getLatLng } from '../../assets/util-functions';

import {
  selectCategories,
  selectConditions,
  selectLanguages
} from '../../redux/constants/constants.selectors';
import { selectGetPriceInUSD } from '../../redux/conversion-rates/conversion-rates.selectors';
import {
  getAllPublicItemsStart,
  searchItemsStart
} from '../../redux/public-items/public-items.actions';

import HandleLocation from '../handle-location/handle-location.component';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import FormSelect from '../form-select/form-select.component';
import HandleCurrency from '../handle-currency/handle-currency.component';

class Search extends React.Component {
  state = {
    titleQuery: '',
    authorQuery: '',
    advancedSearch: false,
    booksIncluded: true,
    collectionsIncluded: true,
    distanceMax: 50,
    category: '',
    language: '',
    condition: '',
    priceMin: '',
    priceMax: null,
    currency: '',
    searchLat: null,
    searchLng: null
  };

  async componentDidMount() {
    try {
      const { latitude, longitude } = await getLatLng();
      // console.log(latitude, longitude);
      this.setState({ searchLat: latitude, searchLng: longitude });
    } catch (err) {
      console.log(err);
    }
  }

  updateCurrency = currency => {
    this.setState({ currency }, () => {
      console.log(this.state.currency);
    });
  };

  updateLocation = (searchLat, searchLng) => {
    this.setState({ searchLat, searchLng }, () => {
      console.log(this.state.searchLat, this.state.searchLng);
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      titleQuery,
      authorQuery,
      advancedSearch,
      booksIncluded,
      collectionsIncluded,
      distanceMax,
      category,
      language,
      condition,
      priceMin,
      priceMax,
      currency,
      searchLat,
      searchLng
    } = this.state;

    return (
      <div className='card mt-4'>
        <div className='card-header'>
          <div className='row'>
            <div className='col-md-10'>
              <h4>Search Items</h4>
            </div>
            <div className='col-md-2'>
              <CustomButton
                small
                onClick={() => {
                  if (advancedSearch) {
                    // get the advanced search props to default
                    this.setState({
                      advancedSearch: false,
                      booksIncluded: true,
                      collectionsIncluded: true,
                      distanceMax: 50,
                      category: '',
                      language: '',
                      condition: '',
                      priceMin: '',
                      priceMax: null,
                      currency: '',
                      searchLat: null,
                      searchLng: null
                    });
                  } else {
                    this.setState({ advancedSearch: true });
                  }
                }}
              >
                {advancedSearch ? 'Basic Search' : 'Advanced Search'}
              </CustomButton>
            </div>
          </div>
        </div>

        <div className='card-body'>
          <FormInput
            placeholder='book title'
            name='titleQuery'
            value={titleQuery}
            onChange={this.handleChange}
          />
          <FormInput
            placeholder='author name'
            name='authorQuery'
            value={authorQuery}
            onChange={this.handleChange}
          />
          {advancedSearch && (
            <div>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='row'>
                    <div className='col'>
                      <FormInput
                        placeholder='min price'
                        name='priceMin'
                        value={priceMin}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className='col'>
                      <FormInput
                        placeholder='max price'
                        name='priceMax'
                        value={priceMax}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className='col'>
                      <HandleCurrency
                        originalCurrency={currency}
                        updateCurrency={this.updateCurrency}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='row'>
                    <div className='col'>
                      <input
                        type='radio'
                        className=''
                        name='booksCollsRadio'
                        checked={booksIncluded && !collectionsIncluded}
                        onChange={() =>
                          this.setState({
                            booksIncluded: true,
                            collectionsIncluded: false
                          })
                        }
                      />
                      <label className=''>Books</label>
                    </div>

                    <div className='col'>
                      <input
                        type='radio'
                        className=''
                        name='booksCollsRadio'
                        checked={!booksIncluded && collectionsIncluded}
                        onChange={() =>
                          this.setState({
                            collectionsIncluded: true,
                            booksIncluded: false
                          })
                        }
                      />
                      <label className=''>Collections</label>
                    </div>

                    <div className='col'>
                      <input
                        type='radio'
                        className=''
                        name='booksCollsRadio'
                        checked={booksIncluded && collectionsIncluded}
                        onChange={() =>
                          this.setState({
                            booksIncluded: true,
                            collectionsIncluded: true
                          })
                        }
                      />
                      <label className=''>Both</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-md-4'>
                  <FormSelect
                    small
                    list={['Select category ...', ...this.props.categories]}
                    name='category'
                    value={category}
                    onChange={this.handleChange}
                  />
                </div>
                <div className='col-md-4'>
                  <FormSelect
                    small
                    list={['Select language ...', ...this.props.languages]}
                    name='language'
                    value={language}
                    onChange={this.handleChange}
                  />
                </div>
                <div className='col-md-4'>
                  <FormSelect
                    small
                    list={['Select condition ...', ...this.props.conditions]}
                    name='condition'
                    value={condition}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-md-10'>
                  <HandleLocation
                    updateLocation={this.updateLocation}
                    latitude={searchLat}
                    longitude={searchLng}
                  />
                </div>
                <div className='col-md-2'>
                  <FormInput
                    placeholder='max distance'
                    name='distanceMax'
                    value={distanceMax}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='card-footer'>
          <div className='text-right'>
            <CustomButton
              small
              outline
              primary
              onClick={() => {
                this.props.getAllPublicItemsStart();
              }}
            >
              Cancel Search
            </CustomButton>
            <CustomButton
              small
              outline
              primary
              onClick={() => {
                // convert the price to the price with USD
                const { priceMin, priceMax, currency } = this.state;
                const minPriceInUSD =
                  this.props.getPriceInUSD(priceMin, currency) || 0;
                const maxPriceInUSD = this.props.getPriceInUSD(
                  priceMax,
                  currency
                );

                // get the search object from the state
                const { advancedSearch, ...searchObject } = this.state;
                // set the new price values in usd (without changing the component state)
                searchObject.priceMin = minPriceInUSD;
                searchObject.priceMax = maxPriceInUSD;
                // search
                this.props.searchItemsStart(searchObject);
              }}
            >
              <i className='fas fa-search' /> Search
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: selectCategories(state),
  languages: selectLanguages(state),
  conditions: selectConditions(state),
  getPriceInUSD: (price, fromCurrency) =>
    selectGetPriceInUSD(price, fromCurrency)(state)
});

const mapDispatchToProps = dispatch => ({
  getAllPublicItemsStart: () => dispatch(getAllPublicItemsStart()),
  searchItemsStart: searchQuery => dispatch(searchItemsStart(searchQuery))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);