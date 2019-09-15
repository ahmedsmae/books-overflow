import React from 'react';
import { withRouter } from 'react-router-dom';

import BookCard from '../book-card/book-card.component';
import CollectionCard from '../collection-card/collection-card.component';
import NotificationCard from '../notification-card/notification-card.component';

import { PATHS } from '../../assets/list.types';

import './list.styles.scss';

const List = ({ location: { pathname }, list }) => {
  switch (pathname) {
    case PATHS.MY_LIBRARY_PATH:
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

    case PATHS.MY_NOTIFICATIONS_PATH:
      return (
        <div className='card mt-4'>
          <div className='card-body'>
            {list.map((not, index) => (
              <NotificationCard notification={not} key={index} />
            ))}
          </div>
        </div>
      );

    case PATHS.HOME_PATH:
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

export default withRouter(List);
