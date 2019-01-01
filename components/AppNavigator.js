import { black, white } from "../utils/colors";
import DeckDetail from './DeckDetail';
import Tabs from './Tabs';
import AddCard from './AddCard';
import { 
    createStackNavigator,
    createAppContainer 
} from 'react-navigation';

const AppNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
          header: null
        } 
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: black
        }
      }
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        title: 'Add Card',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: black
        }
      }
    },
})
  
 export default createAppContainer(AppNavigator);