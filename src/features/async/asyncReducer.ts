import { AsyncAction } from './asyncActions';
import { AsyncActionType } from './asyncConstants';

const initialState = {};

// fetchEvent_456 or fetchEvents
export const createAsyncId = (payload: {
  actionName: string;
  actionId?: string;
}) => {
  const { actionId, actionName } = payload;
  if (!actionName) throw new Error('Please provide async identifier');
  let asyncId = actionName;
  if (actionId) asyncId += `_${actionId}`;
  return asyncId;
};

export const asyncReducer = (state = initialState, action: AsyncAction) => {
  switch (action.type) {
    case AsyncActionType.Start:
      const asyncIdStart = createAsyncId(action.payload);
      return {
        ...state,
        [asyncIdStart]: {
          loading: true
        }
      };
    case AsyncActionType.Finish:
      const asyncIdFinish = createAsyncId(action.payload);
      return {
        ...state,
        [asyncIdFinish]: {
          loading: false
        }
      };
    case AsyncActionType.Error:
      const asyncIdError = createAsyncId(action.payload);
      return {
        ...state,
        [asyncIdError]: {
          loading: false
        }
      };
  }
  return state;
};

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
