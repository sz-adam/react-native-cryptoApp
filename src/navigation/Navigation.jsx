import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from '../components/Welcome';
import Crypto from '../components/Crypto';
import Favorites from '../components/Favorites';
import Icon from 'react-native-vector-icons/Ionicons';
import CoinDetails from '../components/CoinDetails';
import { useFavoritContext } from '../context/FavoritesContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  const { favorites } = useFavoritContext();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Crypto" component={Crypto}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={36} />
          ),

        }} />
      <Tab.Screen
        name="Favorite"
        component={Favorites}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="heart-circle-outline" color={color} size={36} />
              <Text style={styles.navigationText}>{favorites.length || 0}</Text>
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="CoinDetails"
          component={CoinDetails}
          options={({ route }) => ({
            headerBackTitleVisible: false,
            title: route.params.coinName, 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navigationText: {
    color: 'rgb(2 132 199)',
    fontWeight: 'bold',


  },
})

export default Navigation;