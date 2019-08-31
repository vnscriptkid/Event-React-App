import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './DropzoneInput.css';
import { Icon, Header } from 'semantic-ui-react';

interface DropzoneProps {
  setFiles(files: File[]): void;
}

const DropzoneInput: React.SFC<DropzoneProps> = ({ setFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map(file => ({
          ...file,
          preview: URL.createObjectURL(file)
        }))
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: 'image/*'
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone${isDragActive ? ' dropzone--active' : ''}`}
    >
      <input {...getInputProps()} />
      <Icon name='upload' size='huge' />
      <Header content='Drop image here' />
    </div>
  );
};

export { DropzoneInput };
