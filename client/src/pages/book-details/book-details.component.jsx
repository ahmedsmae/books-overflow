import React from 'react';
import { connect } from 'react-redux';

import {
  selectCategories,
  selectConditions,
  selectLanguages
} from '../../redux/constants/constants.selectors';
import { selectSelectedItem } from '../../redux/current-user/current-user.selectors';
import { selectGetPriceInUSD } from '../../redux/conversion-rates/conversion-rates.selectors';
import {
  editBookStart,
  deleteBookStart
} from '../../redux/current-user/current-user.actions';
import { setAlert } from '../../redux/alert/alert.actions';

import FormInput from '../../components/form-input/form-input.component';
import FormSelect from '../../components/form-select/form-select.component';
import FormTextArea from '../../components/form-text-area/form-text-area.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import HandleLocation from '../../components/handle-location/handle-location.component';
import HandleCurrency from '../../components/handle-currency/handle-currency.component';
import HandleMultipleImages from '../../components/handle-multiple-images/handle-multiple-images.component';
import ConfirmDialog from '../../components/confirm-dialog/confirm-dialog.component';

import './book-details.styles.scss';

class BookDetails extends React.Component {
  state = {
    _id: null,
    status: 'Available',
    title: '',
    author: '',
    publishdate: '',
    category: '',
    language: '',
    condition: '',
    summary: '',
    price: '',
    currency: null,
    latitude: null,
    longitude: null,
    keywords: '',
    imageids: [],
    newImageSources: [],
    displayConfirmDialog: false
  };

  static getDerivedStateFromProps(props, currentState) {
    if (props.selectedBook) {
      return {
        _id: props.selectedBook._id,
        title: props.selectedBook.title,
        status: props.selectedBook.status,
        author: props.selectedBook.author,
        publishdate: props.selectedBook.publishdate,
        category: props.selectedBook.category,
        language: props.selectedBook.language,
        condition: props.selectedBook.condition,
        summary: props.selectedBook.summary,
        price: props.selectedBook.price,
        currency: props.selectedBook.currency,
        latitude: props.selectedBook.latitude,
        longitude: props.selectedBook.longitude,
        keywords: props.selectedBook.keywords,
        imageids: props.selectedBook.imageids
        // computed_prop: heavy_computation(props.selectedBook)
      };
    }
    return null;
  }

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

  updateImageSources = newImageSources => {
    this.setState({ newImageSources }, () => {
      console.log(this.state.newImageSources);
    });
  };

  updateImageIds = imageids => {
    this.setState({ imageids }, () => {
      console.log(this.state.imageids);
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

    console.log('Saving...');
    console.log({ ...this.state });

    const errors = [];
    const { currency, latitude, longitude } = this.state;
    if (!latitude || !longitude) errors.push('Please choose the book location');
    if (!currency) errors.push('Please choose a price currency');

    if (errors.length)
      return this.props.setAlert(null, errors, 'danger', errors.length * 2000);

    // convert the price to the price with USD
    const newPrice = this.props.getPriceInUSD(
      this.state.price,
      this.state.currency
    );

    this.setState({ price: newPrice, currency: 'USD' }, () => {
      this.props.editBookStart({ ...this.state });
    });

    this.props.history.goBack();
  };

  render() {
    const {
      _id,
      // status,
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
      keywords,
      imageids,
      displayConfirmDialog
    } = this.state;

    return (
      <div className='card'>
        <div className='card-body'>
          <p className='lead'>Edit Book Details</p>
          <form onSubmit={this.handleSubmit}>
            <label>General Details</label>
            <div className='form-row'>
              <div className='col-md-6'>
                <FormInput
                  prepend='Title'
                  placeholder='eg.: Journey to the center of the earth.'
                  name='title'
                  value={title}
                  onChange={this.handleChange}
                  required
                />
                <FormInput
                  prepend='Author'
                  placeholder='eg.: Ahmed Afifi.'
                  name='author'
                  value={author}
                  onChange={this.handleChange}
                  required
                />
                <FormInput
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
              <div className='col-md-6'>
                <FormSelect
                  prepend='Category'
                  list={this.props.categories}
                  name='category'
                  value={category}
                  onChange={this.handleChange}
                  required
                />
                <FormSelect
                  prepend='Language'
                  list={this.props.languages}
                  name='language'
                  value={language}
                  onChange={this.handleChange}
                  required
                />
                <FormSelect
                  prepend='Condition'
                  list={this.props.conditions}
                  name='condition'
                  value={condition}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <hr />
            <label>Pricing details</label>
            <div className='form-row'>
              <div className='col-md-6'>
                <FormInput
                  prepend='Price'
                  type='number'
                  placeholder='enter price'
                  name='price'
                  value={price}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className='col-md-6'>
                <HandleCurrency
                  originalCurrency={currency}
                  updateCurrency={this.updateCurrency}
                />
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
            <label>Photos</label>
            <HandleMultipleImages
              maxPhotos='3'
              url='/api/bookimages/'
              imageids={imageids}
              updateImageSources={this.updateImageSources}
              updateImageIds={this.updateImageIds}
            />
            <small className='form-text text-muted'>
              Images will be resized to max of 500px width or height
            </small>
            <hr />

            <label>Book Description</label>
            <FormTextArea
              placeholder='tell us more about this book.'
              name='summary'
              value={summary}
              onChange={this.handleChange}
            />
            <hr />
            <FormInput
              label='Keywords'
              placeholder='eg.: forex, stocks.'
              hint='Use comma "," to separate between keywords. Keywords will help others to find your book easily'
              name='keywords'
              value={keywords}
              onChange={this.handleChange}
            />
            <div className='row'>
              <div className='col' />
              {this.props.selectedBook && (
                <CustomButton
                  className='col-2 m-2'
                  danger
                  onClick={() => this.setState({ displayConfirmDialog: true })}
                >
                  Delete Book
                </CustomButton>
              )}
              <CustomButton primary type='submit' className='col-2 m-2'>
                {this.props.selectedBook ? 'Save Changes' : 'Save Book'}
              </CustomButton>
              {displayConfirmDialog && (
                <ConfirmDialog
                  title='Confirm Delete'
                  message='You really want to delete that book ?'
                  display={displayConfirmDialog}
                  onChoose={response => {
                    response && this.props.deleteBookStart(_id);
                    this.setState({ displayConfirmDialog: false });
                  }}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: selectCategories(state),
  languages: selectLanguages(state),
  conditions: selectConditions(state),
  selectedBook: selectSelectedItem(state),
  getPriceInUSD: (price, fromCurrency) =>
    selectGetPriceInUSD(price, fromCurrency)(state)
});

const mapDispatchToProps = dispatch => ({
  editBookStart: bookInfo => dispatch(editBookStart(bookInfo)),
  deleteBookStart: bookId => dispatch(deleteBookStart(bookId)),
  setAlert: (title, message, alertType, timeout) =>
    dispatch(setAlert(title, message, alertType, timeout))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookDetails);
