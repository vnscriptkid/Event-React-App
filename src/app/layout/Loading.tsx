import * as React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export interface LoadingProps {}

const Loading: React.SFC<LoadingProps> = () => {
  return (
    <Dimmer inverted active={true}>
      <Loader content='Loading...' />
    </Dimmer>
  );
};

export { Loading };
