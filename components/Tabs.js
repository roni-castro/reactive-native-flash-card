import React from 'react';
import NewDeck from './NewDeck'
import Decks from './Decks'
import { Platform } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { red, white } from '../utils/colors'
import { 
    createBottomTabNavigator,
    createMaterialTopTabNavigator, 
    createAppContainer 
} from 'react-navigation';


const RouteConfigs = {
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-add-circle-outline' size={30} color={tintColor}  />
        }
    }
}

const TabNavigatorConfig = {
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? red : white,
        style: {
            backgroundColor: Platform.OS === 'ios' ? white : red,
            height: 56,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
}

const TabsNavigator =
  Platform.OS === "ios"
  ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
  : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);
 
export default createAppContainer(TabsNavigator)