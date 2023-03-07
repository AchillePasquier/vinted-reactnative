import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";

const WIDTH = Dimensions.get("window").width;

import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";

function SettingsScreen({ setToken, setId }) {
  const navigation = useNavigation();

  const LogOut = () => {
    setToken(null);
    setId(null);
  };

  const LogOutAlert = () =>
    Alert.alert("Déconnexion", "Êtes-vous sûre de vouloir vous déconnecter ?", [
      {
        text: "NON",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OUI", onPress: () => LogOut() },
    ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "light-content" : "light-content"}
      />
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          style={styles.goback}
          size={28}
          color="#1E1E1E"
        />
      </TouchableOpacity> */}
      <Text style={styles.title}>Paramètres</Text>
      <TouchableOpacity
        style={styles.link}
        onPress={() => {
          navigation.navigate("Details");
        }}
      >
        <Text style={styles.text}>Informations du compte</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={LogOutAlert}>
        <Text style={styles.text}>Déconnexion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  // goback: {
  //   position: "absolute",
  //   top: 7,
  //   color: "#E7E7E7",
  //   left: WIDTH * 0.045,
  // },
  title: {
    textAlign: "center",
    color: "#E7E7E7",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 20,
  },
  link: {
    borderTopWidth: 0.4,
    borderBottomWidth: 0.4,
    height: 45,
    borderColor: "#B8B8B8",
    justifyContent: "center",
    marginTop: 40,
  },
  text: {
    color: "#B8B8B8",
    fontSize: 17,
    marginLeft: WIDTH * 0.05,
  },
});
