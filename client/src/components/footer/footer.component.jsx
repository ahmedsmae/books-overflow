import React from 'react';
import { Link } from 'react-router-dom';

import { PATHS } from '../../assets/list.types';

import CustomButton from '../custom-button/custom-button.component';

import './footer.styles.scss';

const Footer = () => {
  return (
    <footer id='sticky-footer' className='py-3 bg-dark text-white-50'>
      <div className='row'>
        <div className='col-md-9 text-center ml-4'>
          <p className='lead text-white'>
            Copyright &copy; 2019 Books Overflow
          </p>
        </div>
        {/* <div className='text-right mr-3'> */}
        <Link className='m-2' to={PATHS.CONTACT_US_PATH}>
          <CustomButton small light outline>
            CONTACT US
          </CustomButton>
        </Link>

        <Link className='m-2' to={PATHS.ABOUT_PATH}>
          <CustomButton small light outline>
            ABOUT
          </CustomButton>
        </Link>
        {/* </div> */}
      </div>
    </footer>
  );
};

export default Footer;
