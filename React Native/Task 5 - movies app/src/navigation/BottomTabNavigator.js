import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#1f1d2b',
          borderTopColor: '#1f1d2b',
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          const tintColor = focused ? '#fff' : '#8e8e8e';

          if (route.name === 'Home') {
            iconName = require('../../assets/home.png');
          } else if (route.name === 'Categories') {
            iconName = require('../../assets/category.png');
          } else if (route.name === 'Favorites') {
            iconName = require('../../assets/heart.png');
          }

          return <Image source={iconName} style={{ width: 24, height: 24, tintColor: tintColor }} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
