import * as React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import defaultPhoto from '../../../../assets/default-user-image.png';

export interface UserPhotosProps {
  profile: any;
  photos: any[];
  deleteImage: any;
  setMainPhoto: any;
}

const UserPhotos: React.SFC<UserPhotosProps> = ({
  profile,
  photos = [],
  deleteImage,
  setMainPhoto
}) => {
  const photosWithoutMainOne = photos.filter(
    photo => photo.url !== profile.photoURL
  );
  return (
    <Card.Group itemsPerRow={5}>
      <Card>
        <Image src={profile.photoURL || defaultPhoto} />
        <Button positive>Main Photo</Button>
      </Card>
      {photos &&
        photosWithoutMainOne.map(photo => (
          <Card key={photo.id}>
            <Image src={photo.url} />
            <div className='ui two buttons'>
              <Button basic color='green' onClick={() => setMainPhoto(photo)}>
                Main
              </Button>
              <Button
                basic
                icon='trash'
                color='red'
                onClick={() => deleteImage(photo)}
              ></Button>
            </div>
          </Card>
        ))}
    </Card.Group>
  );
};

export { UserPhotos };
