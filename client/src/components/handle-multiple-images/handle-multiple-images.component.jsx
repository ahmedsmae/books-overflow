import React from 'react';
import Compress from 'compress.js';
import Lightbox from 'react-image-lightbox';

import { imageFileTypes } from './handle-image.utils';

import CustomButton from '../custom-button/custom-button.component';
import CustomImage from '../custom-image/custom-image.component';

import 'react-image-lightbox/style.css';
import './handle-multiple-images.styles.scss';

/**
 * @parentProps - {maxPhotos, imageids, updateImageSources, updateImageIds}
 * @action - add photos till the maxPhotos, display them in thumbnail and display in modal onClick
 */
class HandleMultipleImages extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.state = {
      maxPhotos: this.props.maxPhotos ? this.props.maxPhotos : 3,
      imageids: this.props.imageids.length ? this.props.imageids : [],
      selectedPhotos: [], // will contain the photo sources that has been selected here
      isPhotoEnlarged: false,
      enlargedPhotoSource: null
    };
  }

  canAddMore = () => {
    // will return if we can add more photos or not
    const { imageids, selectedPhotos, maxPhotos } = this.state;

    return imageids.length + selectedPhotos.length < maxPhotos;
  };

  compressImage = ({ maxHeight, maxWidth }, file) => {
    return new Promise((resolve, reject) => {
      const compress = new Compress();
      compress
        .compress([file], {
          size: 1,
          quality: 1,
          maxHeight,
          maxWidth,
          resize: true
        })
        .then(data => resolve(`${data[0].prefix}${data[0].data}`))
        .catch(err => reject(err));
    });
  };

  handleChange = async ({ target: { files } }) => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const newSource = await this.compressImage(
        { maxHeight: 500, maxWidth: 500 },
        currentFile
      );

      this.setState(
        {
          selectedPhotos: [...this.state.selectedPhotos, newSource]
        },
        () => {
          // console.log(this.state.selectedPhotos);
          this.props.updateImageSources(this.state.selectedPhotos);
        }
      );
    }
  };

  render() {
    const {
      imageids,
      selectedPhotos,
      isPhotoEnlarged,
      enlargedPhotoSource
    } = this.state;

    return (
      <div className='form-row'>
        <div
          className='col-md-10 pr-2 text-center'
          style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
        >
          {imageids.map((id, index) => (
            // ! change avatars to bookimages
            <div className='d-inline-flex flex-column' key={index}>
              <CustomImage
                source={`api/avatars/${id}`}
                onClick={() =>
                  this.setState({
                    isPhotoEnlarged: true,
                    enlargedPhotoSource: `api/avatars/${id}`
                  })
                }
              />
              <div className='pb-2 px-4'>
                <CustomButton
                  outline
                  small
                  dark
                  onClick={() => {
                    const newIdsArray = imageids;
                    newIdsArray.splice(index, 1);
                    this.setState(
                      {
                        imageids: newIdsArray
                      },
                      () => {
                        this.props.updateImageIds(this.state.imageids);
                      }
                    );
                  }}
                >
                  Delete Image
                </CustomButton>
              </div>
            </div>
          ))}
          {selectedPhotos.map((source, index) => (
            <div className='d-inline-flex flex-column' key={index}>
              <CustomImage
                source={source}
                onClick={() =>
                  this.setState({
                    isPhotoEnlarged: true,
                    enlargedPhotoSource: source
                  })
                }
              />
              <div className='pb-2 px-4'>
                <CustomButton
                  outline
                  small
                  dark
                  onClick={() => {
                    const newSourcesArray = selectedPhotos;
                    newSourcesArray.splice(index, 1);
                    this.setState(
                      {
                        selectedPhotos: newSourcesArray
                      },
                      () => {
                        this.props.updateImageSources(
                          this.state.selectedPhotos
                        );
                      }
                    );
                  }}
                >
                  Delete Image
                </CustomButton>
              </div>
            </div>
          ))}
        </div>
        {this.canAddMore() && (
          <div className='col-md-2 text-center'>
            <CustomButton
              large
              outline
              primary
              onClick={() => {
                this.inputRef.current.click();
              }}
            >
              <i className='fas fa-plus' /> Images
            </CustomButton>
            <input
              type='file'
              multiple={false}
              accept={imageFileTypes.types}
              onChange={this.handleChange}
              ref={this.inputRef}
              hidden={true}
            />
          </div>
        )}
        {/* IMAGES MODAL */}
        {isPhotoEnlarged && (
          <Lightbox
            mainSrc={enlargedPhotoSource}
            // nextSrc={images[(photoIndex + 1) % images.length]}
            // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isPhotoEnlarged: false })}
            // onMovePrevRequest={() =>
            //   this.setState({
            //     photoIndex: (photoIndex + images.length - 1) % images.length
            //   })
            // }
            // onMoveNextRequest={() =>
            //   this.setState({
            //     photoIndex: (photoIndex + 1) % images.length
            //   })
            // }
          />
        )}
      </div>
    );
  }
}

export default HandleMultipleImages;
