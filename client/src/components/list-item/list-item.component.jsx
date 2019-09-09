import React from 'react';

import { SpecificListTypes } from '../../assets/list.types';

import './list-item.styles.scss';

/**
 * @param {type} - type of the item
 * @param {item} - book, collection, notification, chat
 */
const ListItem = ({ type, item }) => {
  switch (type) {
    case SpecificListTypes.HOME_PAGE_ITEMS:
      return <div>{type}</div>;

    default:
      return <div>List Item</div>;
  }
};

export default ListItem;
