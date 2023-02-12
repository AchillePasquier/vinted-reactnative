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

const HomeStack = createNativeStackNavigator();

function HomeStackScreen(search, setSearch) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1E1E1E",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen
        name="Home"
        // component={HomeScreen}
        options={{
          headerTitle: () => <SearchBar setSearch={setSearch} />,
        }}
      >
        {() => <HomeScreen search={search} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Product"
        component={ProductScreen}
        options={{ headerShown: false }}
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
  const [search, setSearch] = useState("vans");

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Accueil" component={HomeStackScreen} />
        <Tab.Screen name="Paramètres" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
