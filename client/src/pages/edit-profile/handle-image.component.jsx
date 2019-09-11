import React, { useState } from 'react';
import Compress from 'compress.js';
import ReactCrop from 'react-image-crop';

import {
  imageFileTypes,
  image64toCanvasRef,
  extractImageFileExtensionFromBase64
} from './handle-image.utils';

import BlankUser from '../../assets/user.png';

import CustomButton from '../../components/custom-button/custom-button.component';

import 'react-image-crop/lib/ReactCrop.scss';

const HandleImage = ({ updateImage, avatarid }) => {
  const [image, setImage] = useState({
    source: avatarid ? `api/avatars/${avatarid}` : BlankUser,
    isImageSelected: false,
    crop: { aspect: 1 / 1, x: 10, y: 10, width: 250, height: 250 }
  });
  const { source, isImageSelected, crop } = image;

  let canvasRef = React.createRef();
  let inputRef = React.createRef();

  const compressImage = ({ maxHeight, maxWidth }, file) => {
    return new Promise((resolve, reject) => {
      const compress = new Compress();
      compress
        .compress([file], {
          size: 0.5,
          quality: 1,
          maxHeight,
          maxWidth,
          resize: true
        })
        .then(data => resolve(`${data[0].prefix}${data[0].data}`))
        .catch(err => reject(err));
    });
  };

  const handleChange = async ({ target: { files } }) => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      setImage({
        ...image,
        source: await compressImage(
          { maxHeight: 400, maxWidth: 400 },
          currentFile
        ),
        isImageSelected: true
      });
    }
  };

  const handleCropChange = crop => {
    setImage({ ...image, crop });
  };

  // ! ERROR HERE
  const handleCropComplete = (crop, percentCrop) => {
    image64toCanvasRef(canvasRef.current, source, crop);
  };

  const handleDoneClick = event => {
    event.preventDefault();
    const fileExtension = extractImageFileExtensionFromBase64(source);
    const canvasBase64 = canvasRef.current.toDataURL(`image/${fileExtension}`);
    setImage({
      ...image,
      isImageSelected: false,
      source: canvasBase64,
      crop: { aspect: 1 / 1, x: 10, y: 10, width: 250, height: 250 }
    });
    updateImage(canvasBase64);
    // console.log(canvasBase64);

    // const downloadFileName = `UserPhoto.${fileExtension}`;
    // downloadBase64File(canvasBase64, downloadFileName);
  };

  return (
    <div className='profile-photo'>
      {isImageSelected ? (
        <div>
          <ReactCrop
            src={source}
            crop={crop}
            onChange={handleCropChange}
            onComplete={handleCropComplete}
          />
          <canvas ref={canvasRef} hidden={true}></canvas>
          <div className='m-2'>
            <CustomButton small outline primary onClick={handleDoneClick}>
              Done Cropping
            </CustomButton>
          </div>
        </div>
      ) : (
        <div>
          <img src={source} style={{ width: 250 }} alt='User' />
          <input
            type='file'
            multiple={false}
            accept={imageFileTypes.types}
            onChange={handleChange}
            ref={inputRef}
            hidden={true}
          />
          <div className='m-3'>
            <CustomButton
              small
              outline
              primary
              onClick={() => inputRef.current.click()}
            >
              Change Photo
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandleImage;
