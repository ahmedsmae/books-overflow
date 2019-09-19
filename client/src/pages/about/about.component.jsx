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
        <p className='lead mb-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio aliquam
          repellat, distinctio, voluptatibus doloribus accusamus explicabo
          laboriosam tempore numquam ducimus dolore dolores facilis molestias
          facere, ipsa reprehenderit. Eaque voluptatum vitae necessitatibus
          perferendis autem praesentium labore est tempora aperiam numquam
          repellat, voluptates maxime voluptas ad quidem quibusdam in modi
          deserunt, quasi distinctio. Atque ut accusantium provident doloribus
          aliquid, vitae inventore illum.
        </p>
        <hr />
        <div className='text-center mb-3'>
          <h3>About the Developer</h3>
        </div>
        <div className='row'>
          <div className='col-md-5 text-center'>
            <img
              className='developer-image'
              src={DeveloperImage}
              alt='developer'
            />
          </div>
          <div className='col-md-7'>
            <p className='lead'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              eius sequi ex quia amet laudantium assumenda, molestias
              repudiandae deserunt, quaerat cupiditate itaque laboriosam. Atque,
              ipsum exercitationem. Sint ut, recusandae expedita nemo ratione
              itaque iusto cupiditate placeat labore officia, sequi aspernatur
              quas mollitia! Nesciunt, error accusantium non nostrum itaque
              natus tempore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
