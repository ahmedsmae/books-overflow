import React from 'react';

import BookCard from '../book-card/book-card.component';
import CollectionCard from '../collection-card/collection-card.component';
import { SpecificListTypes } from '../../assets/list.types';

import './list.styles.scss';

const List = ({ type, list }) => {
  switch (type) {
    case SpecificListTypes.MY_LIBRARY:
      return (
        <div className='card mt-4'>
          <div className='card-body'>
            {list.map((item, index) =>
              // ! arrange array by createdAt date
              item.hasOwnProperty('books') ? (
                <CollectionCard collection={item} key={index} />
              ) : (
                <BookCard book={item} key={index} />
              )
            )}
          </div>
        </div>
      );

    // other cases for other lists

    default:
      return <div>UNKNOWN LIST</div>;
  }
};

export default List;
