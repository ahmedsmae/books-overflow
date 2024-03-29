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
  editCollectionStart,
  deleteCollectionStart
} from '../../redux/current-user/current-user.actions';
import { setAlert } from '../../redux/alert/alert.actions';

import FormInput from '../../components/form-input/form-input.component';
import FormSelect from '../../components/form-select/form-select.component';
import FormTextArea from '../../components/form-text-area/form-text-area.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import HandleLocation from '../../components/handle-location/handle-location.component';
import HandleCurrency from '../../components/handle-currency/handle-currency.component';
import HandleMultipleImages from '../../components/handle-multiple-images/handle-multiple-images.component';
import CollectionBooksList from './collection-books-list.component';
import ConfirmDialog from '../../components/confirm-dialog/confirm-dialog.component';

import './collection-details.styles.scss';

class BookDetails extends React.Component {
  state = {
    _id: null,
    status: 'Available',
    title: '',
    numberofbooks: '',
    books: [],
    category: '',
    language: '',
    summary: '',
    price: '',
    currency: '',
    latitude: null,
    longitude: null,
    keywords: '',
    imageids: [],
    newImageSources: [],
    displayConfirmDialog: false
  };

  static getDerivedStateFromProps(props, currentState) {
    if (props.selectedCollection) {
      return {
        _id: props.selectedCollection._id,
        status: props.selectedCollection.status,
        title: props.selectedCollection.title,
        numberofbooks: props.selectedCollection.numberofbooks,
        books: props.selectedCollection.books,
        category: props.selectedCollection.category,
        language: props.selectedCollection.language,
        summary: props.selectedCollection.summary,
        price: props.selectedCollection.price,
        currency: props.selectedCollection.currency,
        latitude: props.selectedCollection.latitude,
        longitude: props.selectedCollection.longitude,
        keywords: props.selectedCollection.keywords,
        imageids: props.selectedCollection.imageids
        // computed_prop: heavy_computation(props.selectedCollection)
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

  updateBooksArray = books => {
    this.setState({ books }, () => {
      console.log(this.state.books);
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
    const { currency, latitude, longitude, books } = this.state;
    if (!latitude || !longitude) errors.push('Please choose the book location');
    if (!currency) errors.push('Please choose a price currency');
    if (!books.length) errors.push('Please add books to the collection');

    if (errors.length)
      return this.props.setAlert(null, errors, 'danger', errors.length * 2000);

    // convert the price to the price with USD
    const newPrice = this.props.getPriceInUSD(
      this.state.price,
      this.state.currency
    );

    this.setState({ price: newPrice, currency: 'USD' }, () => {
      this.props.editCollectionStart({ ...this.state });
    });

    this.props.history.goBack();
  };

  render() {
    const {
      _id,
      // status,
      title,
      numberofbooks,
      books,
      category,
      language,
      summary,
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
          <p className='lead'>Edit Collection Details</p>
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
                  prepend='Number of books'
                  placeholder='eg.: 9'
                  name='numberofbooks'
                  value={numberofbooks}
                  onChange={this.handleChange}
                  required
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
              </div>
            </div>
            <hr />
            <CollectionBooksList
              booksArray={books}
              updateBooksArray={this.updateBooksArray}
            />
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
              maxPhotos='5'
              url='/api/collectionimages/'
              imageids={imageids}
              updateImageSources={this.updateImageSources}
              updateImageIds={this.updateImageIds}
            />
            <small className='form-text text-muted'>
              Images will be resized to max of 500px width or height
            </small>
            <hr />

            <label>Collection Description</label>
            <FormTextArea
              placeholder='tell us more about this collection.'
              name='summary'
              value={summary}
              onChange={this.handleChange}
            />
            <hr />
            <FormInput
              label='Keywords'
              placeholder='eg.: forex, stocks.'
              hint='Use comma "," to separate between keywords. Keywords will help others to find your collection easily'
              name='keywords'
              value={keywords}
              onChange={this.handleChange}
            />
            <div className='row'>
              <div className='col' />
              {this.props.selectedCollection && (
                <CustomButton
                  className='col-2 m-2'
                  danger
                  onClick={() => this.setState({ displayConfirmDialog: true })}
                >
                  Delete Collection
                </CustomButton>
              )}
              <CustomButton primary type='submit' className='col-2 m-2'>
                {this.props.selectedCollection
                  ? 'Save Changes'
                  : 'Save Collection'}
              </CustomButton>
              {displayConfirmDialog && (
                <ConfirmDialog
                  title='Confirm Delete'
                  message='You really want to delete that collection ?'
                  display={displayConfirmDialog}
                  onChoose={response => {
                    response && this.props.deleteCollectionStart(_id);
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
  selectedCollection: selectSelectedItem(state),
  getPriceInUSD: (price, fromCurrency) =>
    selectGetPriceInUSD(price, fromCurrency)(state)
});

const mapDispatchToProps = dispatch => ({
  editCollectionStart: bookInfo => dispatch(editCollectionStart(bookInfo)),
  deleteCollectionStart: collectionId =>
    dispatch(deleteCollectionStart(collectionId)),
  setAlert: (title, message, alertType, timeout) =>
    dispatch(setAlert(title, message, alertType, timeout))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookDetails);
