import React from 'react';
import Tabs from './components/Tabs'
import CustomStatusBar from './components/CustomStatusBar'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { View } from 'react-native'
import { black } from './utils/colors'
import reducers from './reducers/reducers'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={black} barStyle='light-content' />
          <Tabs />
        </View>
      </Provider>
    );
  }
}