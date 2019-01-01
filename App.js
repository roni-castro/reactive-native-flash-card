import React from 'react';
import AppNavigator from './components/AppNavigator'
import CustomStatusBar from './components/CustomStatusBar'
import { Provider } from 'react-redux'
import { View } from 'react-native'
import { black } from './utils/colors'
import { createStore } from 'redux'
import { applyMiddleware }  from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index'

export default class App extends React.Component {
  render() {
    const store = createStore(reducers, applyMiddleware(thunk));
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={black} barStyle='light-content' />
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}