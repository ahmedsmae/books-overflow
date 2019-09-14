import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCategories,
  selectConditions,
  selectLanguages
} from '../../redux/constants/constants.selectors';
import { selectSelectedItem } from '../../redux/current-user/current-user.selectors';
import { editCollectionStart } from '../../redux/current-user/current-user.actions';

import FormInput from '../../components/form-input/form-input.component';
import FormSelect from '../../components/form-select/form-select.component';
import FormTextArea from '../../components/form-text-area/form-text-area.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import HandleLocation from '../../components/handle-location/handle-location.component';
import HandleCurrency from '../../components/handle-currency/handle-currency.component';
import HandleMultipleImages from '../../components/handle-multiple-images/handle-multiple-images.component';
import CollectionBooksList from './collection-books-list.component';

import './collection-details.styles.scss';

class BookDetails extends React.Component {
  state = {
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
    newImageSources: []
  };

  static getDerivedStateFromProps(props, currentState) {
    if (props.selectedCollection) {
      return {
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

    // ! display status proparly
    // ! make sure that user select category, language and condition

    console.log('Saving...');
    console.log({ ...this.state });

    this.props.editCollectionStart({ ...this.state });
  };

  render() {
    const {
      status,
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
      imageids
    } = this.state;

    return (
      <div className='card mt-4'>
        <div className='card-body'>
          <p className='lead'>Edit Collection Details</p>
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
                  prepend='Number of books'
                  placeholder='eg.: 9'
                  name='numberofbooks'
                  value={numberofbooks}
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
              <div className='col-md-6 pr-2'>
                <FormInput
                  large
                  prepend='Price'
                  placeholder='enter price'
                  name='price'
                  value={price}
                  onChange={this.handleChange}
                />
              </div>
              <div className='col-md-6 pl-2'>
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
            <div className=''>Photos</div>
            <HandleMultipleImages
              maxPhotos='5'
              url='api/collectionimages/'
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
              large
              placeholder='tell us more about this collection.'
              name='summary'
              value={summary}
              onChange={this.handleChange}
            />
            <hr />
            <FormInput
              large
              label='Keywords'
              placeholder='eg.: forex, stocks.'
              hint='Use comma "," to separate between keywords. Keywords will help others to find your collection easily'
              name='keywords'
              value={keywords}
              onChange={this.handleChange}
            />
            <div className='mt-4 text-right'>
              <CustomButton large primary type='submit'>
                {this.props.selectedCollection
                  ? 'Save Changes'
                  : 'Save Collection'}
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
  conditions: selectConditions,
  selectedCollection: selectSelectedItem
});

const mapDispatchToProps = dispatch => ({
  editCollectionStart: bookInfo => dispatch(editCollectionStart(bookInfo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookDetails);
