import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '../reducers';
import thunk from 'redux-thunk';

// const rrfConfig = {
//   userProfiles: 'users',
//   attachAuthIsReady: true,
//   useFirestoreForProfile: true
// };

export const configureStore = () => {
  const middlewares = [thunk];
  const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, composedEnhancer);
  return store;
};

// export const configureStore = () => {
//   const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
//   const composedEnhancer = composeWithDevTools(
//     applyMiddleware(...middlewares),
//     reactReduxFirebase(firebase, rrfConfig),
//     reduxFirestore(firebase, {})
//   );
//   const store = createStore(rootReducer, composedEnhancer);
//   return store;
// };
