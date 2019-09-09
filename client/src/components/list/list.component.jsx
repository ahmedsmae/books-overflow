import React from 'react';

import ListItem from '../list-item/list-item.component';

import './list.styles.scss';

const List = ({ type, list }) => {
  return (
    <div>
      {list.map(item => (
        <ListItem type={type} item={item} />
      ))}
    </div>
  );
};

export default List;
