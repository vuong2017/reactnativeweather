import React from 'react';
import { AppRegistry } from 'react-native';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducers from './src/Redux/Reducers';
import {FetchDataWeather} from './src/Redux/ActionCreators';
const store = createStore(rootReducers,applyMiddleware(thunk));
import App from './App';
store.dispatch(FetchDataWeather());
const AppWithStore = ()=>(
  <Provider store={store}>
    <App />
  </Provider>
)
AppRegistry.registerComponent('AppWeather', ()=>AppWithStore);
