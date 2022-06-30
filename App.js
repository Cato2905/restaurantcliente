
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/Login';
import Registrer from './components/Registrer';
import {
  SafeAreaView,

} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  tabBarStyle: {
                    backgroundColor: "#333"
                  }
                }}
              >
                <Tab.Screen name="Login" options={{headerTitle:"Login" , headerShown: false}}>
                  {(props) => (
                    <Login
                      {...props}
                    />
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen name="Registrer">
            {(props) => (
              <Registrer
                {...props}
              />
            )}
          </Stack.Screen>
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
