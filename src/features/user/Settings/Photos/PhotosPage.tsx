import React, { useState, useEffect, Fragment } from 'react';
import { Segment, Header, Grid, Divider, Button } from 'semantic-ui-react';
import { DropzoneInput } from './DropzoneInput';
import { CropperInput } from './CropperInput';
import { updateUserImage } from '../../userActions';
import { toastr } from 'react-redux-toastr';
import { firestoreConnect, WithFirestoreProps } from 'react-redux-firebase';
import { compose } from 'redux';
import { StoreState } from '../../../../app/reducers';
import { connect } from 'react-redux';
import { UserPhotos } from './UserPhotos';

export interface PhotosPageProps extends WithFirestoreProps {
  updateUserImage: typeof updateUserImage;
  profile: any;
  photos: any[];
}

const _PhotosPage: React.SFC<PhotosPageProps> = ({
  profile,
  photos,
  updateUserImage
}) => {
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
      await updateUserImage(image, 'avatar.jpeg');
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

      <UserPhotos profile={profile} photos={photos} />
    </Segment>
  );
};

const mapState = (state: StoreState) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos
});

const PhotosPage = compose<any>(
  connect(mapState),
  firestoreConnect<any>(({ auth, profile }): any => {
    console.log(auth, profile);
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
