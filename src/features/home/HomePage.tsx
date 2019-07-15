import React from 'react';
import { History } from 'history';
import { Segment, Container, Header, Button, Icon } from 'semantic-ui-react';

export interface HomePageProps {
  history: History;
}

const HomePage: React.SFC<HomePageProps> = ({ history }) => {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container>
        <Header inverted>Re-vents</Header>
        <Button onClick={() => history.push('/events')} size='huge' inverted>
          Get Started
          <Icon name='arrow right' />
        </Button>
      </Container>
    </Segment>
  );
};

export { HomePage };
