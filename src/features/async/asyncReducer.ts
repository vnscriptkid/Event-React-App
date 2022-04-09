const ASYNC_ACTION_START = "ASYNC_ACTION_START";
const ASYNC_ACTION_FINISH = "ASYNC_ACTION_FINISH";
const ASYNC_ACTION_ERROR = "ASYNC_ACTION_ERROR";
export const APP_LOADED = "APP_LOADED";

export function asyncActionStart() {
  return {
    type: ASYNC_ACTION_START,
  };
}

export function asyncActionFinish() {
  return {
    type: ASYNC_ACTION_FINISH,
  };
}

export function asyncActionError(error: any) {
  console.log(error);
  return {
    type: ASYNC_ACTION_ERROR,
    payload: error,
  };
}

const initialState = {
  loading: false,
  error: null,
  initialized: false,
};

export function asyncReducer(state = initialState, { type, payload }: any) {
  switch (type) {
    case ASYNC_ACTION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ASYNC_ACTION_FINISH:
      return {
        ...state,
        loading: false,
      };
    case ASYNC_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case APP_LOADED:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
}

// import { AsyncAction } from './asyncActions';
// import { AsyncActionType } from './asyncConstants';

// const initialState = {};

// // fetchEvent_456 or fetchEvents
// export const createAsyncId = (payload: {
//   actionName: string;
//   actionId?: string;
// }) => {
//   const { actionId, actionName } = payload;
//   if (!actionName) throw new Error('Please provide async identifier');
//   let asyncId = actionName;
//   if (actionId) asyncId += `_${actionId}`;
//   return asyncId;
// };

// export const asyncReducer = (state = initialState, action: AsyncAction) => {
//   switch (action.type) {
//     case AsyncActionType.Start:
//       const asyncIdStart = createAsyncId(action.payload);
//       return {
//         ...state,
//         [asyncIdStart]: {
//           loading: true
//         }
//       };
//     case AsyncActionType.Finish:
//       const asyncIdFinish = createAsyncId(action.payload);
//       return {
//         ...state,
//         [asyncIdFinish]: {
//           loading: false
//         }
//       };
//     case AsyncActionType.Error:
//       const asyncIdError = createAsyncId(action.payload);
//       return {
//         ...state,
//         [asyncIdError]: {
//           loading: false
//         }
//       };
//   }
//   return state;
// };

// const initialState = {
//   loading: false
// };

// export const asyncReducer = (state = initialState, action: AsyncAction) => {
//   switch (action.type) {
//     case AsyncActionType.Start:
//       return {
//         ...state,
//         loading: true
//       };
//     case AsyncActionType.Finish:
//       return {
//         ...state,
//         loading: false
//       };
//     case AsyncActionType.Error:
//       return {
//         ...state,
//         loading: false
//       };
//   }
//   return state;
// };
