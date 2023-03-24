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
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import imageAcceuil from "../assets/photoAccueil.png";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function StartedScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "light-content" : "light-content"}
      />
      <Image source={imageAcceuil} style={styles.image} />
      <Text style={styles.text}>
        Vends sans frais ce que tu ne porte plus. Rejoins-nous !
      </Text>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.registerButtonText}>S'inscrire sur Vinted</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("LogIn")}
      >
        <Text style={styles.loginButtonText}>J'ai déjà un compte</Text>
      </TouchableOpacity>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      /> */}
    </View>
  );
}

export default StartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
  },
  image: {
    width: WIDTH * 0.97,
    height: WIDTH,
    marginTop: HEIGHT * 0.07,
  },
  text: {
    color: "#E7E7E7",
    fontSize: 25,
    textAlign: "center",
    width: WIDTH * 0.95,
    marginTop: HEIGHT * 0.05,
  },
  registerButton: {
    width: WIDTH * 0.9,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#449da9",
    justifyContent: "center",
    alignItems: "center",
    marginTop: HEIGHT * 0.05,
    borderWidth: 1,
    borderColor: "#449da9",
  },
  registerButtonText: {
    color: "#1E1E1E",
    fontSize: 17,
  },
  loginButton: {
    width: WIDTH * 0.9,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#449da9",
    justifyContent: "center",
    alignItems: "center",
    marginTop: HEIGHT * 0.025,
  },
  loginButtonText: {
    color: "#449da9",
    fontSize: 17,
  },
});
