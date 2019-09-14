import * as React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';

export interface UserPhotosProps {
  profile: any;
  photos: any[];
}

const UserPhotos: React.SFC<UserPhotosProps> = ({ profile, photos = [] }) => {
  const photosWithoutMainOne = photos.filter(
    photo => photo.url !== profile.photoURL
  );
  return (
    <Card.Group itemsPerRow={5}>
      {profile.photoURL && (
        <Card>
          <Image src={profile.photoURL} />
          <Button positive>Main Photo</Button>
        </Card>
      )}
      {photos &&
        photosWithoutMainOne.map(photo => (
          <Card>
            <Image src={photo.url} />
            <div className='ui two buttons'>
              <Button basic color='green'>
                Main
              </Button>
              <Button basic icon='trash' color='red'></Button>
            </div>
          </Card>
        ))}
    </Card.Group>
  );
};

export { UserPhotos };
