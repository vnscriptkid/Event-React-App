import React, { useState, useEffect } from 'react';
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

export interface PhotosPageProps {}

const PhotosPage: React.SFC<PhotosPageProps> = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    return () => {
      files.forEach(file => {
        URL.revokeObjectURL((file as any).preview);
      });
    };
  });

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
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header
              color='teal'
              sub
              content='Step 3 - Preview & Upload'
            ></Header>
            <Image src={files[0] && (files[0] as any).preview} />
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

export { PhotosPage };
