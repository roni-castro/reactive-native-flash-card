import React from 'react';
import { View } from 'react-native';
import Tabs from './components/Tabs'
import { black } from './utils/colors'
import CustomStatusBar from './components/CustomStatusBar';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CustomStatusBar backgroundColor={black} barStyle='light-content' />
        <Tabs />
      </View>
    );
  }
}