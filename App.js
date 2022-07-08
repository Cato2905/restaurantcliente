import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import Perfil from './components/Perfil';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Pedido from './components/Pedido';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



const App = () => {

  const [user, setUser] = useState(null)



  const logOut = () => {

    firebase.auth().signOut().then(() => {
      setUser(null)
    })

  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((usuario) => {
      if (usuario) {
        firebase.firestore().collection("Trabajador").doc(usuario.uid).get().then((document) => {
          const userData = document.data()
          setUser(userData)
        })
      }
    })
  }, [user])


  useEffect(() => {

  }, [user])


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Tab" options={{ headerShown: false }}>
              {() => (
                <Tab.Navigator
                  screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {
                      backgroundColor: "#333"
                    }
                  }}
                >
                  <Tab.Screen
                    name="Menu"
                    options={{
                      headerShown: false,
                      tabBarIcon: () => (
                        <IconAwesome name="home" size={30} color="#148D6F" />

                      )
                    }}
                  >
                    {(props) => (
                      <Home
                        {...props}
                        user={user}
                        logOut={logOut}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="Editar Perfil"
                    options={{
                      headerTitle: "Perfil",
                      headerShown: false,
                      tabBarIcon: () => (
                        <IconAwesome name="user" size={30} color="#148D6F"
                        />
                      )
                    }}>
                    {(props) => (
                      <Perfil
                        {...props}
                        user={user}
                        logOut={logOut}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="Pedido"
                    options={{
                      headerTitle: "Pedido",
                      headerShown: false,
                      tabBarIcon: () => (
                        <MaterialCommunityIcons name="chef-hat" size={30} color="#148D6F" />
                      )
                    }}>
                    {(props) => (
                      <Pedido
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
