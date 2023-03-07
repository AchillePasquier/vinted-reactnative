import * as React from "react";
import { useState } from "react";
import axios from "axios";
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
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";

const WIDTH = Dimensions.get("window").width;

function LogInScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (email && password) {
      try {
        const response = await axios.post("http://localhost:4000/user/login", {
          email,
          password,
        });
        console.log(response.data);
        setToken(response.data.token);
        setId(response.data._id);
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
        if (error.response.data) {
          setError(error.response.data.error);
        }
      }
    } else {
      setError("Veuillez remplir tous les champs");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "light-content" : "light-content"}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          style={styles.goback}
          size={28}
          color="#1E1E1E"
        />
      </TouchableOpacity>
      <Text style={styles.title}>Se connecter</Text>
      <TextInput
        keyboardType={"email-address"}
        placeholder="Adresse email"
        placeholderTextColor={"#B8B8B8"}
        value={email}
        style={styles.formInput}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor={"#B8B8B8"}
        value={password}
        style={styles.formInput}
        onChangeText={(text) => {
          setPassword(text);
        }}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Se connecter</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </SafeAreaView>
  );
}

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
  },
  goback: {
    position: "absolute",
    top: 7,
    right: WIDTH * 0.385,
    color: "#E7E7E7",
  },
  title: {
    textAlign: "center",
    color: "#E7E7E7",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 35,
  },
  formInput: {
    width: WIDTH * 0.9,
    marginTop: 37,
    borderColor: "#B8B8B8",
    borderBottomWidth: 0.3,
    height: 35,
    fontSize: 16,
    color: "#E7E7E7",
  },
  errorText: {
    marginTop: 60,
    color: "red",
  },
  submitButton: {
    width: WIDTH * 0.9,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#449da9",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    borderWidth: 1,
    borderColor: "#449da9",
  },
  submitButtonText: {
    color: "#1E1E1E",
    fontSize: 17,
  },
});
