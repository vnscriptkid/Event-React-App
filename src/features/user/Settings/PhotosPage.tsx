import React from 'react';
import {
  Segment,
  Header,
  Grid,
  Divider,
  Card,
  Image,
  Button
} from 'semantic-ui-react';

export interface PhotosPageProps {}

const PhotosPage: React.SFC<PhotosPageProps> = () => {
  return (
    <Segment>
      <Header dividing size='large' content='Your Photos'></Header>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header color='teal' sub content='Step 1 - Add Photo'></Header>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header color='teal' sub content='Step 2 - Resize image'></Header>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header
              color='teal'
              sub
              content='Step 3 - Preview and Upload'
            ></Header>
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
            <Button basic icon='trash' color='red'>
              Trash
            </Button>
          </div>
        </Card>
      </Card.Group>
    </Segment>
  );
};

export { PhotosPage };
