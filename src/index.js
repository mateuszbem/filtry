import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware} from 'redux'
import Reducers from './reducers/reducers';
import App from './containers/app';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const middleWare = applyMiddleware(thunk);
const store =  createStore(Reducers,middleWare);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
