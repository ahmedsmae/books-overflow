import React from 'react';
import { withRouter } from 'react-router-dom';

import BookCard from '../book-card/book-card.component';
import CollectionCard from '../collection-card/collection-card.component';
import NotificationCard from '../notification-card/notification-card.component';

import { PATHS } from '../../assets/list.types';

import './list.styles.scss';

const List = ({ location: { pathname }, list }) => {
  if (
    pathname.includes(PATHS.LIBRARY_PATH_NO_ID) ||
    pathname === PATHS.HOME_PATH ||
    pathname === PATHS.FAVOURITES_PATH
  ) {
    // it's an items list
    return (
      <div className='card'>
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
  } else if (pathname === PATHS.NOTIFICATIONS_PATH) {
    //  it's notification list
    return (
      <div className='card mt-4'>
        <div className='card-body'>
          {list.map((not, index) => (
            <NotificationCard notification={not} key={index} />
          ))}
        </div>
      </div>
    );
  } else if (pathname === PATHS.BLOCKED_USERS_PATH) {
    //  it's a users list
    return <div className='card mt-4'>Blocked Users Here</div>;
  }
};

export default withRouter(List);
