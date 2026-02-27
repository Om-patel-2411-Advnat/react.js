import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// here by just wrapping the provider around the root component doesn't mean the store value is passed to the components we have to pass this explicitly

import './index.css';
import App from './App';
import store from './Store/reduxIndex';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // here store is a inbuilt prop that pass the redux store to the components 
    // after doing that every component now can subscribe to the store and also pass the dispatch actions to the store 
<Provider store={store}>
    <App />
</Provider>
);
