import React from 'react';

import DeveloperImage from '../../assets/developer.jpg';

import './about.styles.scss';

const About = () => {
  return (
    <div className='card'>
      <div className='card-body'>
        <div className='text-center mb-3'>
          <h3>What is Books Overflow ?</h3>
        </div>
        <p className='lead'>
          Books Overflow is a platform where you can share all your books with
          whoever interested either by posting them as a single books or as a
          collection of many books, attaching with them all the info that could
          be required such as the titles, authors, descriptions, images,
          categories, language, physical condition, price (for book or whole
          collection), keywords for easily finding them as well as the locations
          where the potential buyers can find them.
        </p>
        <p className='lead mb-3'>
          And on the other side potential buyers can serach and find the books
          they are interested in either from the home page which will detect
          their current location and will display the books located arround them
          sorted by it's distance from the user or by using the advanced search
          engine which will allow them to find books by their detailed infos
          such as title, author, location, condition, min/max price, ...etc
        </p>
        <hr />
        <div className='text-center mb-3'>
          <h3>About the Developer</h3>
          <p className='lead'>
            Ahmed Mohsen Afifi. A pharmacy graduate from Egypt with enough
            experience to build the full stack for this web application (Front
            and Backend)
          </p>
        </div>
        <div className='row'>
          <div className='col-md-3 text-center'>
            <img
              className='developer-image'
              src={DeveloperImage}
              alt='developer'
            />
          </div>
          <div className='col-md-9'>
            <ol>
              <h4>Technologies used to build Books Overflow</h4>
              <ul className='mb-2'>
                <h5>On The Backend</h5>
                <li>
                  NodeJs / ExpressJs for building backend server with all
                  necessary routes
                </li>
                <li>
                  MongoDB / Mongoose for handling ful CRUD operations on the
                  database and all the different modules
                </li>
                <li>
                  BcryptJs / DotEnv / JWT to perform secure handling of
                  passwords, environment variables and login sessions
                </li>
                <li>
                  MulterJs / SharpJs to handle file transfer to the server and
                  database with a proper compression
                </li>
                <li>
                  Nodemailer to handle mailing in Contact Us form and Forget
                  Password Mechanisms
                </li>
                <li>
                  Socket.io to setup an instant messaging between Books and
                  collections owners and buyers
                </li>
                <li>Express-sslify, Express-validator, compression and cors</li>
              </ul>
              <ul>
                <h5>On the Frontend</h5>
                <li>
                  ReactJs / React Hooks to build all pages and reuseable
                  components
                </li>
                <li>
                  React Router DOM to handle navigation throw different routes
                </li>
                <li>
                  Bootstrap 4 to apply basic styling for most of the pages and
                  components
                </li>
                <li>Redux for complete app level state management</li>
                <li>
                  Redux-Saga / Axios to handle requests between front and
                  backend
                </li>
                <li>
                  Redux-Logger / Persist for logging the state to the console
                  and persist it over restart of the application in the
                  development environment
                </li>
                <li>
                  Reselect Library for careful selection of the requires state
                  portion and prevent unnecessary rerender and guarenty better
                  performance
                </li>
                <li>
                  + various other libraries for croping and compressing images,
                  build google places autocomplete and to display dates and
                  times proparly
                </li>
              </ul>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
