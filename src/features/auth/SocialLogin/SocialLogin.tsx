import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { socialLogin } from '../authActions';
import { AuthProviderOption } from '../authConstants';

export interface SocialLoginProps {
  login: typeof socialLogin;
}

const SocialLogin: React.SFC<SocialLoginProps> = ({ login }) => {
  return (
    <div>
      <Button
        style={{ marginBottom: '10px' }}
        type='button'
        fluid
        color='facebook'
        onClick={() => login(AuthProviderOption.Facebook)}
      >
        <Icon name='facebook' />
        Login with Facebook
      </Button>
      <Button
        type='button'
        fluid
        color='google plus'
        onClick={() => login(AuthProviderOption.Google)}
      >
        <Icon name='google plus' />
        Login with Google
      </Button>
    </div>
  );
};

export { SocialLogin };
