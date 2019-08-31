import React, { Component, createRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper').default

interface CropperInputProps {
  imagePreview: string;
  setImage(image: any): void;
}

interface CropperInputState {}

class CropperInput extends Component<CropperInputProps, CropperInputState> {
  cropper = createRef();

  cropImage = () => {
    if (!(this.cropper.current as any).getCroppedCanvas()) return;
    (this.cropper.current as Cropper).getCroppedCanvas().toBlob(blob => {
      this.props.setImage(blob);
    }, 'image/jpeg');
  };

  render() {
    const { imagePreview } = this.props;
    if (!imagePreview) return null;
    return (
      <Cropper
        ref={this.cropper as any}
        src={imagePreview}
        style={{ height: 200, width: '100%' }}
        preview='.img-preview'
        aspectRatio={1}
        viewMode={1}
        dragMode='move'
        guides={false}
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}
        crop={this.cropImage}
      />
    );
  }
}

export { CropperInput };
