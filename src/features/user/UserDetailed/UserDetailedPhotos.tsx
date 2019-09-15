import * as React from 'react';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';

export interface UserDetailedPhotosProps {
  photos: any[];
}

const UserDetailedPhotos: React.SFC<UserDetailedPhotosProps> = ({ photos }) => {
  return photos.length > 0 ? (
    <Grid.Column width={12}>
      <Segment attached>
        <Header icon='image' content='Photos'></Header>
        <Image.Group size='small'>
          {photos.map(({ id, url }) => (
            <Image key={id} src={url}></Image>
          ))}
        </Image.Group>
      </Segment>
    </Grid.Column>
  ) : null;
};

export { UserDetailedPhotos };
