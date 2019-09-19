import React from 'react';

import './page-404.styles.scss';

const Page404 = () => {
  return (
    <div className='text-center my-5'>
      <img
        src='https://i.imgur.com/Q2BAOd2.png'
        alt='Page Not Found'
        style={{ height: '400px' }}
      />
      <p className='lead mt-4 text-danger'>404 - This page doesn't exists</p>
    </div>
  );
};

export default Page404;
