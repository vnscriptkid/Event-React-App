import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../app/reducers';
import {
  incrementCounter,
  decrementCounter,
  incrementAsync
} from './testActions';
import { Button } from 'semantic-ui-react';
import { openModal } from '../modals/modalActions';
import { AsyncActionPayload } from '../async/asyncActions';
import { createAsyncId } from '../async/asyncReducer';

export interface TestPageProps {
  counter: number;
  incrementCounter: typeof incrementCounter;
  decrementCounter: typeof decrementCounter;
  incrementAsync: typeof incrementAsync;
  openModal: typeof openModal;
  loading: boolean;
}

function getAsyncState(async: any, payload: AsyncActionPayload) {
  return (
    async &&
    async[createAsyncId(payload)] &&
    async[createAsyncId(payload)].loading
  );
}

const _TestPage: React.SFC<TestPageProps> = props => {
  return (
    <div>
      <div>
        <Button
          loading={getAsyncState(props.loading, {
            actionName: 'increment',
            actionId: '1'
          })}
          color='green'
          onClick={() =>
            props.incrementAsync({ actionName: 'increment', actionId: '1' })
          }
        >
          Increment Async 1
        </Button>
        <Button
          loading={getAsyncState(props.loading, {
            actionName: 'increment',
            actionId: '2'
          })}
          color='green'
          onClick={() =>
            props.incrementAsync({ actionName: 'increment', actionId: '2' })
          }
        >
          Increment Async 2
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
      {/* <LocationSearchInput /> */}
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
    loading: state.async
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
)(_TestPage as any);

export { TestPage };
