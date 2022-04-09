import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementCounter,
  decrementCounter,
  incrementAsync,
} from "./testActions";
import { Button } from "semantic-ui-react";
import { openModal } from "../modals/modalActions";
// import { AsyncActionPayload } from "../async/asyncActions";
// import { createAsyncId } from "../async/asyncReducer";

// function getAsyncState(async: any, payload: AsyncActionPayload) {
//   return (
//     async &&
//     async[createAsyncId(payload)] &&
//     async[createAsyncId(payload)].loading
//   );
// }

const TestPage = (): JSX.Element => {
  const { counter, loading } = useSelector((state: any) => ({
    counter: state.counter,
    loading: state.async,
  }));

  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <Button
          loading={false}
          // loading={getAsyncState(loading, {
          //   actionName: "increment",
          //   actionId: "1",
          // })}
          color="green"
          onClick={() =>
            dispatch(incrementAsync({ actionName: "increment", actionId: "1" }))
          }
        >
          Increment Async 1
        </Button>
        <Button
          // loading={getAsyncState(loading, {
          //   actionName: "increment",
          //   actionId: "2",
          // })}
          loading={false}
          color="green"
          onClick={() =>
            dispatch(incrementAsync({ actionName: "increment", actionId: "2" }))
          }
        >
          Increment Async 2
        </Button>
      </div>
      <Button
        color="brown"
        onClick={() =>
          dispatch(
            openModal({
              modalType: "TestModal",
              modalProps: { count: 100 },
            })
          )
        }
      >
        Open Modal
      </Button>
      {/* <LocationSearchInput /> */}
      Test: {counter}
      <div>
        <button onClick={() => dispatch(incrementCounter())}>Increment</button>
      </div>
      <div>
        <button onClick={() => dispatch(decrementCounter())}>Decrement</button>
      </div>
    </div>
  );
};

export { TestPage };
