import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './reducers/index'
import {BrowserRouter} from 'react-router-dom'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(rootReducer, reduxDevTools, applyMiddleware(ReduxThunk))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
