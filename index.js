import React from 'react';
import { AppRegistry } from 'react-native';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducers from './src/Redux/Reducers';
import {FetchDataWeather} from './src/Redux/ActionCreators';
import { createStackNavigator  } from 'react-navigation';
import  DetailsItem from './src/Components/DetailsItem';
const store = createStore(rootReducers,applyMiddleware(thunk));
import App from './App';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
store.dispatch(FetchDataWeather());
const RootStack = createStackNavigator(
  {
    Home: App,
    Details: DetailsItem,
  },
  {
    initialRouteName: 'Home',
  }
);
const AppWithStore = ()=>(
  <Provider store={store}>
    <RootStack />
  </Provider>
)
AppRegistry.registerComponent('AppWeather', ()=>AppWithStore);
