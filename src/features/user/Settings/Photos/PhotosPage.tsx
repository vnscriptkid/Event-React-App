import React, { useState, useEffect, Fragment } from 'react';
import {
  Segment,
  Header,
  Grid,
  Divider,
  Card,
  Image,
  Button
} from 'semantic-ui-react';
import { DropzoneInput } from './DropzoneInput';
import { CropperInput } from './CropperInput';
import { updateUserImage } from '../../userActions';
import { toastr } from 'react-redux-toastr';
import { firestoreConnect, WithFirestoreProps } from 'react-redux-firebase';
import { compose } from 'redux';
import { StoreState } from '../../../../app/reducers';
import { connect } from 'react-redux';

export interface PhotosPageProps extends WithFirestoreProps {
  updateUserImage: typeof updateUserImage;
}

const _PhotosPage: React.SFC<PhotosPageProps> = props => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      files.forEach(file => {
        URL.revokeObjectURL((file as any).preview);
      });
    };
  });

  function handleCancelImage() {
    setImage(null);
    setFiles([]);
  }

  const handleImageUpload = async () => {
    try {
      await props.updateUserImage(image, 'avatar.jpeg');
      toastr.success('Success', 'Image has been uploaded successfully');
      handleCancelImage();
    } catch (e) {
      toastr.error('Oooops!', 'Upload image failed');
    }
  };

  return (
    <Segment>
      <Header dividing size='large' content='Your Photos'></Header>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header color='teal' sub content='Step 1 - Add Photo'></Header>
            <DropzoneInput setFiles={setFiles as any} />
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header color='teal' sub content='Step 2 - Resize image'></Header>
            <CropperInput
              imagePreview={files[0] && (files[0] as any).preview}
              setImage={setImage}
            />
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header
              color='teal'
              sub
              content='Step 3 - Preview & Upload'
            ></Header>
            {files.length > 0 && (
              <Fragment>
                <div
                  className='img-preview'
                  style={{
                    minHeight: '200px',
                    minWidth: '200px',
                    overflow: 'hidden'
                  }}
                ></div>
                <Button.Group>
                  <Button
                    onClick={handleImageUpload}
                    style={{ width: 100 }}
                    positive
                    icon='check'
                  />
                  <Button
                    onClick={handleCancelImage}
                    style={{ width: 100 }}
                    color='red'
                    icon='close'
                  />
                </Button.Group>
              </Fragment>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider />
      <Header sub color='teal' content='All Photos' />

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src={`https://randomuser.me/api/portraits/men/64.jpg`} />
          <Button positive>Main Photo</Button>
        </Card>
        <Card>
          <Image src={`https://randomuser.me/api/portraits/men/64.jpg`} />
          <div className='ui two buttons'>
            <Button basic color='green'>
              Main
            </Button>
            <Button basic icon='trash' color='red'></Button>
          </div>
        </Card>
      </Card.Group>
    </Segment>
  );
};

const mapState = (state: StoreState) => ({
  auth: state.firebase.auth
});

const PhotosPage = compose<any>(
  connect(mapState),
  firestoreConnect<any>(({ auth }): any => {
    return auth.isLoaded
      ? [
          {
            collection: 'users',
            doc: auth.uid,
            subcollections: [{ collection: 'photos' }],
            storeAs: 'photos'
          }
        ]
      : [];
  })
)(_PhotosPage);

export { PhotosPage };
