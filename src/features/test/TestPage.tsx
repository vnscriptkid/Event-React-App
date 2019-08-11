import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../app/reducers';
import {
  incrementCounter,
  decrementCounter,
  incrementAsync
} from './testActions';
import { LocationSearchInput } from './Autocomplete';
import { Button } from 'semantic-ui-react';
import { openModal } from '../modals/modalActions';

export interface TestPageProps {
  counter: number;
  incrementCounter: typeof incrementCounter;
  decrementCounter: typeof decrementCounter;
  incrementAsync: any;
  openModal: typeof openModal;
  loading: boolean;
}

const _TestPage: React.SFC<TestPageProps> = props => {
  return (
    <div>
      <div>
        <Button
          loading={props.loading}
          color='green'
          onClick={props.incrementAsync}
        >
          Increment Async
        </Button>
      </div>
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
    counter: state.counter,
    loading: state.async.loading
  };
};

const TestPage = connect(
  mapStateToProps,
  {
    incrementCounter,
    decrementCounter,
    openModal,
    incrementAsync
  }
)(_TestPage);

export { TestPage };
