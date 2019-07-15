export enum CounterTypes {
  INCREMENT,
  DECREMENT
}

export const testReducer = (
  state = 0,
  action: { type: number; payload: any }
) => {
  switch (action.type) {
    case CounterTypes.INCREMENT:
      return state + 1;
    case CounterTypes.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

// const createReducer = (initialState: any, actionMap: any) => {
//   return (state = initialState, action: { type: number; payload?: any }) => {
//     const handler = actionMap[action.type];
//     return handler ? handler(state, action) : state;
//   };
// };
