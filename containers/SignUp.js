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
import Checkbox from "expo-checkbox";

import Ionicons from "@expo/vector-icons/Ionicons";

const WIDTH = Dimensions.get("window").width;

function SignUpScreen({ navigation, setToken, setId }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (email && username && newsLetter && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "http://localhost:4000/user/signup",
            {
              email,
              username,
              password,
              newsLetter,
            }
          );
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
        setError("Vos mots de passe ne sont pas identiques");
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
      <Text style={styles.title}>S'inscrire</Text>
      <TextInput
        placeholder="Nom d'utilisateur"
        placeholderTextColor={"#B8B8B8"}
        value={username}
        style={styles.formInput}
        onChangeText={(text) => {
          setUsername(text);
        }}
      />
      <TextInput
        placeholder="Adresse email"
        placeholderTextColor={"#B8B8B8"}
        keyboardType="email-adress"
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
      <TextInput
        placeholder="Confirmer votre mot de passe"
        placeholderTextColor={"#B8B8B8"}
        value={confirmPassword}
        style={styles.formInput}
        onChangeText={(text) => {
          setConfirmPassword(text);
        }}
        secureTextEntry={true}
      />

      <View style={styles.newsletter}>
        <Checkbox
          value={newsLetter}
          onValueChange={setNewsLetter}
          style={styles.checkbox}
          color={newsLetter ? "#449da9" : undefined}
        />
        <Text style={styles.newsletterText}>
          Je souhaite recevoir par e-mail, des offres personnalisées et les
          dernières mises à jour.
        </Text>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>S'inscrire</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </SafeAreaView>
  );
}

export default SignUpScreen;

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
  newsletter: {
    marginTop: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.9,
    alignItems: "flex-start",
  },
  checkbox: {
    marginTop: 3,
  },
  newsletterText: {
    color: "#E7E7E7",
    width: WIDTH * 0.8,
    textAlign: "justify",
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
