import * as React from "react";
import { useState } from "react";
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
import CheckBox from "@react-native-community/checkbox";

import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;

function SignUpScreen({ navigation, setToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (email && username && description && password && confirmPassword) {
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
      <TextInput
        placeholder="Nom d'utilisateur"
        value={username}
        style={styles.formInput}
        onChangeText={(text) => {
          setUsername(text);
        }}
      />
      <TextInput
        placeholder="email"
        keyboardType="email-adress"
        value={email}
        style={styles.formInput}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        style={styles.formInput}
        onChangeText={(text) => {
          setPassword(text);
        }}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Confirmer votre mot de passe"
        value={confirmPassword}
        style={styles.formInput}
        onChangeText={(text) => {
          setConfirmPassword(text);
        }}
        secureTextEntry={true}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View>
        <CheckBox
          value={newsLetter}
          onValueChange={setNewsLetter}
          style={styles.checkbox}
        />
        <Text>
          Je souhaite recevoir par e-mail, des offres personnalisées et les
          dernières mises à jour.
        </Text>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  formInput: {
    width: "80%",
    marginTop: 30,
    borderColor: "#FFBAC0",
    borderBottomWidth: 2,
    height: 35,
  },
  errorText: {
    marginTop: 40,
    color: "red",
  },
  checkbox: {
    alignSelf: "center",
  },
  submitButton: {
    borderColor: "#EB5A62",
    borderWidth: 3,
    marginTop: 55,
    marginBottom: 20,
    width: "60%",
    height: 60,
    //borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#EB5A62",
    fontSize: 18,
    fontWeight: "500",
  },
});
