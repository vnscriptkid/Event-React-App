import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../app/reducers';
import { incrementCounter, decrementCounter } from './testActions';
import { LocationSearchInput } from './Autocomplete';

export interface TestPageProps {
  counter: number;
  incrementCounter: typeof incrementCounter;
  decrementCounter: typeof decrementCounter;
}

const _TestPage: React.SFC<TestPageProps> = props => {
  return (
    <div>
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
  { incrementCounter, decrementCounter }
)(_TestPage);

export { TestPage };
