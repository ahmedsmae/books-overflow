import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCategories,
  selectConditions,
  selectLanguages
} from '../../redux/constants/constants.selectors';

import FormInput from '../../components/form-input/form-input.component';
import FormSelect from '../../components/form-select/form-select.component';
import FormTextArea from '../../components/form-text-area/form-text-area.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import HandleLocation from '../../components/handle-location/handle-location.component';
import HandleCurrency from '../../components/handle-currency/handle-currency.component';

import './book-details.styles.scss';

class BookDetails extends React.Component {
  state = {
    status: this.props.book ? this.props.book.status : 'Available',
    title: this.props.book ? this.props.book.title : '',
    author: this.props.book ? this.props.book.author : '',
    publishdate: this.props.book ? this.props.book.publishdate : '',
    category: this.props.book ? this.props.book.category : '',
    language: this.props.book ? this.props.book.language : '',
    summary: this.props.book ? this.props.book.summary : '',
    condition: this.props.book ? this.props.book.condition : '',
    price: this.props.book ? this.props.book.price : '',
    currency: this.props.book ? this.props.book.currency : '',
    latitude: this.props.book ? this.props.book.latitude : null,
    longitude: this.props.book ? this.props.book.longitude : null,
    keywords: this.props.book ? this.props.book.keywords : ''
  };

  updateCurrency = currency => {
    this.setState({ currency }, () => {
      console.log(this.state.currency);
    });
  };

  updateLocation = (latitude, longitude) => {
    this.setState({ latitude, longitude }, () => {
      console.log(this.state.latitude, this.state.longitude);
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      console.log(this.state[name]);
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // run action
  };

  render() {
    const {
      status,
      title,
      author,
      publishdate,
      category,
      language,
      summary,
      condition,
      price,
      currency,
      latitude,
      longitude,
      keywords
    } = this.state;

    return (
      <div className='card mt-4'>
        <div className='card-body'>
          <p className='lead'>Edit Book Details</p>
          <form onSubmit={this.handleSubmit}>
            <label>General Details</label>
            <div className='form-row'>
              <div className='col-md-6 pr-2'>
                <FormInput
                  large
                  prepend='Title'
                  placeholder='eg.: Journey to the center of the earth.'
                  name='title'
                  value={title}
                  onChange={this.handleChange}
                />
                <FormInput
                  large
                  prepend='Author'
                  placeholder='eg.: Ahmed Afifi.'
                  name='author'
                  value={author}
                  onChange={this.handleChange}
                />
                <FormInput
                  large
                  type='date'
                  prepend='Date'
                  placeholder='select date ...'
                  name='publishdate'
                  value={
                    publishdate
                      ? publishdate
                      : new Date().toISOString().split('T')[0]
                  }
                  onChange={this.handleChange}
                />
              </div>
              <div className='col-md-6 pl-2'>
                <FormSelect
                  large
                  prepend='Category'
                  list={['Select ...', ...this.props.categories]}
                  name='category'
                  value={category}
                  onChange={this.handleChange}
                />
                <FormSelect
                  large
                  prepend='Language'
                  list={['Select ...', ...this.props.languages]}
                  name='language'
                  value={language}
                  onChange={this.handleChange}
                />
                <FormSelect
                  large
                  prepend='Condition'
                  list={['Select ...', ...this.props.conditions]}
                  name='condition'
                  value={condition}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <hr />
            <label>Pricing details</label>
            <div className='form-row'>
              <div className='col-md-6'>
                <FormInput
                  large
                  prepend='Price'
                  placeholder='enter price'
                  name='price'
                  value={price}
                  onChange={this.handleChange}
                />
              </div>
              <div className='col-md-6'>
                <HandleCurrency
                  originalCurrency={currency}
                  updateCurrency={this.updateCurrency}
                />
                {/* <FormInput
                  large
                  prepend='Currency'
                  placeholder='eg.: USD'
                  name='currency'
                  value={currency}
                  onChange={this.handleChange}
                /> */}
              </div>
            </div>
            <hr />
            <label>Location Details</label>
            <HandleLocation
              updateLocation={this.updateLocation}
              latitude={latitude}
              longitude={longitude}
            />

            <hr />
            <div className=''>Photos</div>
            <hr />

            <label>Book Description</label>
            <FormTextArea
              large
              placeholder='tell us more about this book.'
              name='summary'
              value={summary}
              onChange={this.handleChange}
            />
            <hr />
            <FormInput
              large
              label='Keywords'
              placeholder='eg.: forex, stocks.'
              hint='Use comma "," to separate between keywords. Keywords will help others to find your book easily'
              name='keywords'
              value={keywords}
              onChange={this.handleChange}
            />
            <div className='mt-4 text-right'>
              <CustomButton large primary type='submit'>
                {this.props.book ? 'Save Changes' : 'Save Book'}
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categories: selectCategories,
  languages: selectLanguages,
  conditions: selectConditions
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookDetails);
