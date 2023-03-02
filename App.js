// //import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from "react";
import { Button, Text, View, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";

import StartedScreen from "./containers/Started";
import SignUpScreen from "./containers/SignUp";
import LogInScreen from "./containers/LogIn";

import HomeScreen from "./containers/Home";
import ProductScreen from "./containers/Product";
import PaymentScreen from "./containers/Payment";

import SettingsScreen from "./containers/Settings";
import DetailsScreen from "./containers/Details";

import SearchBar from "./components/Searchbar";
import Logo from "./components/Logo";

import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1E1E1E",
        },
        headerTintColor: "white",
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerTitle: (props) => <SearchBar {...props} />,
        })}
      />
      <HomeStack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoading, setIsloading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      //on aurait du foutre un try catch mais bon (pour les apps en production)
      const userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken);
      setIsloading(false);
    };
    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    return null;
  }

  return (
    <NavigationContainer>
      {userToken === null ? (
        <Stack.Navigator>
          <Stack.Screen name="Started" options={{ headerShown: false }}>
            {() => <StartedScreen />}
          </Stack.Screen>
          <Stack.Screen name="LogIn" options={{ headerShown: true }}>
            {() => <LogInScreen setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp" options={{ headerShown: true }}>
            {(props) => <SignUpScreen {...props} setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#01B5BB",
            tabBarInactiveTintColor: "#B8B8B8",
            tabBarStyle: {
              backgroundColor: "#1E1E1E",
              borderTopWidth: 0,
              height: 80,
            },
            tabBarIconStyle: {
              marginTop: 7,
            },
          }}
        >
          <Tab.Screen
            name="TabHome"
            options={{
              tabBarLabel: "Accueil",
              tabBarShowLabel: true,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-sharp" size={size} color={color} />
              ),
            }}
            component={HomeStackScreen}
          />
          <Tab.Screen
            name="TabSettings"
            options={{
              tabBarLabel: "Paramètres",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" size={size} color={color} />
              ),
            }}
            component={SettingsStackScreen}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
