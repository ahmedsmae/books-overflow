import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectConditions } from '../../redux/constants/constants.selectors';

import { setAlert } from '../../redux/alert/alert.actions';

import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';
import FormSelect from '../../components/form-select/form-select.component';

class CollectionBooksList extends React.Component {
  state = {
    booksArray: [],
    addingBook: false,
    hotBookTitle: '',
    hotBookAuthor: '',
    hotBookCondition: ''
  };

  static getDerivedStateFromProps(props, currentState) {
    if (props.booksArray) {
      return {
        booksArray: props.booksArray
      };
    }
    return null;
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      console.log(this.state[name]);
    });
  };

  openAddingBook = () => {
    this.setState({ addingBook: true });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = [];
    const {
      hotBookTitle,
      hotBookAuthor,
      hotBookCondition,
      booksArray
    } = this.state;
    if (!hotBookTitle.length) errors.push('Please add the book title');
    if (!hotBookAuthor.length) errors.push('Please add the author name');
    if (!hotBookCondition.length)
      errors.push('Please select the book condition');

    if (errors.length)
      return this.props.setAlert(null, errors, 'danger', errors.length * 2000);

    const newBook = {
      title: hotBookTitle,
      author: hotBookAuthor,
      condition: hotBookCondition
    };
    const newBooksArray = [...booksArray, newBook];
    this.setState({
      booksArray: newBooksArray,
      addingBook: false,
      hotBookTitle: '',
      hotBookAuthor: '',
      hotBookCondition: ''
    });
    this.props.updateBooksArray(newBooksArray);
  };

  render() {
    const {
      hotBookTitle,
      hotBookAuthor,
      hotBookCondition,
      addingBook,
      booksArray
    } = this.state;

    return (
      <div className='card'>
        <div className='card-header'>
          <div className='row'>
            <label className='col'>Books details</label>
            <CustomButton
              className='col-1.5 mr-2'
              outline
              primary
              onClick={this.openAddingBook}
            >
              Add Book
            </CustomButton>
          </div>
        </div>
        <div className='card-body'>
          {booksArray.map((book, index) => (
            <div className='row' key={index}>
              <div className='col-5'>
                <FormInput small prepend='Title' value={book.title} disabled />
              </div>
              <div className='col-md-3'>
                <FormInput
                  small
                  prepend='Author'
                  value={book.author}
                  disabled
                />
              </div>
              <div className='col-3'>
                <FormInput
                  small
                  prepend='Condition'
                  value={book.condition}
                  disabled
                />
              </div>
              <div className='col-1'>
                <CustomButton
                  outline
                  danger
                  onClick={() => {
                    const newArray = booksArray;
                    newArray.splice(index, 1);
                    this.setState({ booksArray: newArray });
                    this.props.updateBooksArray(newArray);
                  }}
                >
                  <i className='fas fa-times' />
                </CustomButton>
              </div>
            </div>
          ))}
        </div>
        {addingBook && (
          <div className='card-footer'>
            <div className='row'>
              <div className='col-5'>
                <FormInput
                  prepend='Title'
                  placeholder='eg.: Journey to the center of the earth.'
                  name='hotBookTitle'
                  value={hotBookTitle}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className='col-3'>
                <FormInput
                  prepend='Author'
                  placeholder='eg.: Ahmed Afifi'
                  name='hotBookAuthor'
                  value={hotBookAuthor}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className='col-3'>
                <FormSelect
                  prepend='Condition'
                  list={this.props.conditions}
                  name='hotBookCondition'
                  value={hotBookCondition}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className='col-1'>
                <CustomButton outline success onClick={this.handleSubmit}>
                  <i className='fas fa-check' />
                </CustomButton>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  conditions: selectConditions
});

const mapDispatchToProps = dispatch => ({
  setAlert: (title, message, alertType, timeout) =>
    dispatch(setAlert(title, message, alertType, timeout))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionBooksList);
