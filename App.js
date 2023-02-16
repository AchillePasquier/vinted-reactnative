// //import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from "react";
import { Button, Text, View, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";

import HomeScreen from "./containers/Home";
import ProductScreen from "./containers/Product";
import SettingsScreen from "./containers/Settings";
import DetailsScreen from "./containers/Details";

import SearchBar from "./components/Searchbar";
import Logo from "./components/Logo";

import Ionicons from "@expo/vector-icons/Ionicons";

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
        options={{ headerShown: true }}
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
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#01B5BB",
          tabBarInactiveTintColor: "#B8B8B8",
          tabBarStyle: { backgroundColor: "#1E1E1E", borderTopWidth: 0 },
        }}
      >
        <Tab.Screen
          name="TabHome"
          options={{
            tabBarLabel: "Accueil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-sharp" size={size} color={color} />
            ),
          }}
          component={HomeStackScreen}
        />
        <Tab.Screen
          name="Paramètres"
          options={{
            tabBarLabel: "Paramètres",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
          component={SettingsStackScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
