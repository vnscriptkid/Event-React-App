import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../app/reducers';
import { incrementCounter, decrementCounter } from './testActions';
import { LocationSearchInput } from './Autocomplete';
import { Button } from 'semantic-ui-react';
import { openModal } from '../modals/modalActions';

export interface TestPageProps {
  counter: number;
  incrementCounter: typeof incrementCounter;
  decrementCounter: typeof decrementCounter;
  openModal: typeof openModal;
}

const _TestPage: React.SFC<TestPageProps> = props => {
  return (
    <div>
      <Button
        color='brown'
        onClick={() =>
          props.openModal({
            modalType: 'TestModal',
            modalProps: { count: 100 }
          })
        }
      >
        Open Modal
      </Button>
      <LocationSearchInput />
      Test: {props.counter}
      <div>
        <button onClick={() => props.incrementCounter()}>Increment</button>
      </div>
      <div>
        <button onClick={() => props.decrementCounter()}>Decrement</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    counter: state.counter
  };
};

const TestPage = connect(
  mapStateToProps,
  { incrementCounter, decrementCounter, openModal }
)(_TestPage);

export { TestPage };
