import * as React from 'react';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';

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
            <LazyLoad
              key={id}
              height={150}
              offset={-150}
              placeholder={<Image src='/assets/user.png' />}
            >
              <Image src={url} />
            </LazyLoad>
          ))}
        </Image.Group>
      </Segment>
    </Grid.Column>
  ) : null;
};

export { UserDetailedPhotos };
