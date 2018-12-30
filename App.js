import React from 'react';
import { View } from 'react-native';
import Tabs from './components/Tabs'

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Tabs />
      </View>
    );
  }
}