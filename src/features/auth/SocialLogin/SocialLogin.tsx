import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export interface SocialLoginProps {}

const SocialLogin: React.SFC<SocialLoginProps> = () => {
  return (
    <div>
      <Button
        style={{ marginBottom: '10px' }}
        type='button'
        fluid
        color='facebook'
      >
        <Icon name='facebook' />
        Login with Facebook
      </Button>
      <Button type='button' fluid color='google plus'>
        <Icon name='google plus' />
        Login with Google
      </Button>
    </div>
  );
};

export { SocialLogin };
