import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCategories,
  selectConditions,
  selectLanguages
} from '../../redux/constants/constants.selectors';
import { selectSelectedItem } from '../../redux/current-user/current-user.selectors';
import { editBookStart } from '../../redux/current-user/current-user.actions';

import FormInput from '../../components/form-input/form-input.component';
import FormSelect from '../../components/form-select/form-select.component';
import FormTextArea from '../../components/form-text-area/form-text-area.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import HandleLocation from '../../components/handle-location/handle-location.component';
import HandleCurrency from '../../components/handle-currency/handle-currency.component';
import HandleMultipleImages from '../../components/handle-multiple-images/handle-multiple-images.component';

import './book-details.styles.scss';

class BookDetails extends React.Component {
  state = {
    status: 'Available',
    title: '',
    author: '',
    publishdate: '',
    category: '',
    language: '',
    summary: '',
    condition: '',
    price: '',
    currency: '',
    latitude: null,
    longitude: null,
    keywords: '',
    imageids: [],
    newImageSources: []
  };

  // state = {
  //   status: this.props.selectedBook
  //     ? this.props.selectedBook.status
  //     : 'Available',
  //   title: this.props.selectedBook ? this.props.selectedBook.title : '',
  //   author: this.props.selectedBook ? this.props.selectedBook.author : '',
  //   publishdate: this.props.selectedBook
  //     ? this.props.selectedBook.publishdate
  //     : '',
  //   category: this.props.selectedBook ? this.props.selectedBook.category : '',
  //   language: this.props.selectedBook ? this.props.selectedBook.language : '',
  //   summary: this.props.selectedBook ? this.props.selectedBook.summary : '',
  //   condition: this.props.selectedBook ? this.props.selectedBook.condition : '',
  //   price: this.props.selectedBook ? this.props.selectedBook.price : '',
  //   currency: this.props.selectedBook ? this.props.selectedBook.currency : '',
  //   latitude: this.props.selectedBook ? this.props.selectedBook.latitude : null,
  //   longitude: this.props.selectedBook
  //     ? this.props.selectedBook.longitude
  //     : null,
  //   keywords: this.props.selectedBook ? this.props.selectedBook.keywords : '',
  //   imageids: this.props.selectedBook ? this.props.selectedBook.imageids : [],
  //   newImageSources: []
  // };

  static getDerivedStateFromProps(props, currentState) {
    if (props.selectedBook) {
      return {
        title: props.selectedBook.title,
        status: props.selectedBook.status,
        author: props.selectedBook.author,
        publishdate: props.selectedBook.publishdate,
        category: props.selectedBook.category,
        language: props.selectedBook.language,
        summary: props.selectedBook.summary,
        condition: props.selectedBook.condition,
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

    // ! display status proparly
    // ! make sure that user select category, language and condition

    console.log('Saving...');
    console.log({ ...this.state });

    this.props.editBookStart({ ...this.state });
  };

  render() {
    const {
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
      imageids
    } = this.state;
    console.log(imageids);

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
              maxPhotos='3'
              url='api/bookimages/'
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
                {this.props.selectedBook ? 'Save Changes' : 'Save Book'}
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
  selectedBook: selectSelectedItem
});

const mapDispatchToProps = dispatch => ({
  editBookStart: bookInfo => dispatch(editBookStart(bookInfo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookDetails);
