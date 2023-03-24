// //import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from "react";
import { Button, Text, View, TextInput, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";

import StartedScreen from "./containers/Started";
import SignUpScreen from "./containers/SignUp";
import LogInScreen from "./containers/LogIn";

import PublishScreen from "./containers/Publish";

import HomeScreen from "./containers/Home";
import ProductScreen from "./containers/Product";
import PaymentScreen from "./containers/Payment";

import SettingsScreen from "./containers/Settings";
import DetailsScreen from "./containers/Details";

import SearchBar from "./components/Searchbar";
import Logo from "./components/Logo";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
          // headerLargeTitle: true,
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

const PublishStack = createNativeStackNavigator();

function PublishStackScreen({ userToken }) {
  return (
    <PublishStack.Navigator>
      <PublishStack.Screen name="Publish" options={{ headerShown: false }}>
        {() => <PublishScreen userToken={userToken} />}
      </PublishStack.Screen>
    </PublishStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen({ setToken, userId, userToken, setId }) {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        // component={SettingsScreen}
        options={{ headerShown: false }}
      >
        {() => <SettingsScreen setToken={setToken} setId={setId} />}
      </SettingsStack.Screen>
      <SettingsStack.Screen
        name="Details"
        //component={DetailsScreen}
        options={{ headerShown: false }}
      >
        {() => <DetailsScreen userId={userId} userToken={userToken} />}
      </SettingsStack.Screen>
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const HEIGHT = Dimensions.get("window").height;

export default function App() {
  const [isLoading, setIsloading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const size = 20;

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  // save or remove id in AsyncStorage & state
  const setId = async (id) => {
    if (id) {
      AsyncStorage.setItem("userId", id);
      setUserId(id);
    } else {
      AsyncStorage.removeItem("userId");
      setUserId(null);
    }
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      //on aurait du foutre un try catch mais bon (pour les apps en production)
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      setUserToken(userToken);
      setUserId(userId);
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
          <Stack.Screen
            name="LogIn"
            options={{
              headerShown: false,
            }}
          >
            {() => <LogInScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{
              headerShown: false,
            }}
          >
            {(props) => (
              <SignUpScreen {...props} setToken={setToken} setId={setId} />
            )}
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
              borderTopColor: "#1E1E1E",
              borderTopWidth: 0,
            },
            tabBarIconStyle: {
              marginTop: 5,
            },
            tabBarLabelStyle: {
              marginBottom: 5,
            },
          }}
        >
          <Tab.Screen
            name="TabHome"
            options={{
              tabBarLabel: "Accueil",
              tabBarShowLabel: true,
              tabBarIcon: ({ color, size }) => (
                // <Ionicons name="home-sharp" size={size} color={color} />
                // <Octicons name="fillclock" size={size} color={color} />
                // <Entypo name="home" size={size} color={color} />
                <MaterialIcons name="home-filled" size={28} color={color} />
              ),
            }}
            component={HomeStackScreen}
          />
          <Tab.Screen
            name="TabPublish"
            options={{
              tabBarLabel: "Vendre",
              tabBarShowLabel: true,
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="add-circle" size={size} color={color} />
              ),
            }}
            // component={PublishStackScreen}
          >
            {() => (
              <PublishStackScreen
                // userId={userId}
                userToken={userToken}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="TabSettings"
            options={{
              tabBarLabel: "Profil",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
            // component={SettingsStackScreen}
          >
            {() => (
              <SettingsStackScreen
                setToken={setToken}
                userId={userId}
                userToken={userToken}
                setId={setId}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
