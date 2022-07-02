import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/Login';
import Register from './components/Register';
import { SafeAreaView } from 'react-native';
import Home from './components/Home';
import { firebase } from '@react-native-firebase/firestore';
import Perfil from './components/Perfil';




const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



const App = () => {

  const [user, setUser] = useState(null)
  


  const logOut = () => {

    firebase.auth().signOut().then(() => {
      setUser(null)
    })
  }

  useEffect (() =>{
    firebase.auth().onAuthStateChanged((usuario) => {
      if (usuario) {
        firebase.firestore().collection("Trabajador").doc(usuario.uid).get().then((document) => {
          const userData = document.data()
          setUser(userData)
        })
      }
    })
  },[user])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
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
                  <Tab.Screen name="Home" options={{ headerTitle: "Home", headerShown: false }}>
                    {(props) => (
                      <Home
                        {...props}
                        user={user}
                        logOut={logOut}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="Editar Perfil" options={{ headerTitle: "Perdil", headerShown: false }}>
                    {(props) => (
                      <Perfil
                        {...props}
                        user={user}
                        logOut={logOut}
                      />
                    )}
                  </Tab.Screen>
                  
                </Tab.Navigator>
              )}
            </Stack.Screen>
          </>
        )
          : (
            <>
              <Stack.Screen name="Login">
                {(props) => (
                  <Login
                    {...props}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Register">
                {(props) => (
                  <Register
                    {...props}
                  />
                )}
              </Stack.Screen>

            </>
          )}

      </Stack.Navigator>

    </NavigationContainer >
  );
};


export default App;
