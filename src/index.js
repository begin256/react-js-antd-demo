import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import { createStore } from 'redux'
import monitorReducer from './reducers/monitorReducer'

// var store = createStore(monitorReducer);
// console.log(store)
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
