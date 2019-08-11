import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './app/store/configStore';
import { ScrollTop } from './app/common/utils/scrollTop';
import { fetchEvents } from './features/event/eventActions';
import ReduxToastr from 'react-redux-toastr';
import { ModalManager } from './features/modals/ModalManager';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const store = configureStore();
store.dispatch(fetchEvents() as any);

const Root = () => (
  <Provider store={store}>
    <ModalManager />
    <ReduxToastr
      position='bottom-right'
      transitionIn='fadeIn'
      transitionOut='fadeOut'
    />
    <BrowserRouter>
      <ScrollTop>
        <App />
      </ScrollTop>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
