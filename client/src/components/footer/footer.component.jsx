import React from 'react';
import { Link } from 'react-router-dom';

import { PATHS } from '../../assets/list.types';

import './footer.styles.scss';

const Footer = () => {
  return (
    <footer className='bg-dark text-light mt-4'>
      <div className='container'>
        <div className='row pt-3'>
          <div className='col'>
            <h5>Copyright &copy; 2019 Books Overflow</h5>
          </div>

          <Link
            className='col-1.5 mr-2 nav-link text-light'
            to={PATHS.CONTACT_US_PATH}
          >
            CONTACT US
          </Link>

          <Link className='col-1.5 nav-link text-light' to={PATHS.ABOUT_PATH}>
            ABOUT
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
