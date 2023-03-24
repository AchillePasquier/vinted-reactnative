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
  ScrollView,
  TextInput,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function PublishScreen({ userToken }) {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);

  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
    }
  };

  const PublishAlert = () =>
    Alert.alert("Votre annonce a été publiée", "", [
      {
        text: "FERMER",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);

  const handleSubmit = async () => {
    try {
      console.log(picture);
      const response = await axios.post(
        "http://localhost:4000/offer/publish",
        {
          picture: picture,
          title: title,
          description: description,
          price: price,
          condition: state,
          city: location,
          brand: brand,
          size: size,
          color: color,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      //   alert("Votre annonce a été publiée 😉");
      //   navigate("/");
      PublishAlert();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "light-content" : "light-content"}
      />
      <Text style={styles.title}>Vends un article</Text>
      <ScrollView>
        <View
          style={{
            width: WIDTH,
            height: 300,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={pickImage}>
            {picture ? (
              <Image
                source={{ uri: picture }}
                style={{
                  width: 200,
                  height: 270,
                  objectfit: "cover",
                  borderRadius: 5,
                }}
              />
            ) : (
              <View
                style={{
                  width: 170,
                  height: 50,
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#449da9",
                  borderRadius: 5,
                }}
              >
                <Ionicons
                  name="add"
                  size={24}
                  color={"#449da9"}
                  style={{ marginLeft: 10 }}
                />
                <Text style={{ color: "#449da9", fontSize: 18, marginLeft: 5 }}>
                  Ajouter Photo
                </Text>
              </View>
            )}
          </TouchableOpacity>
          {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
          {picture && (
            <Image
              source={{ uri: picture }}
              style={{ width: 200, height: 200 }}
            />
          )} */}
        </View>
        <View style={styles.blackSeparation}></View>
        <Text style={styles.label}>Titre</Text>
        <TextInput
          placeholder="ex : Chemise Sézane Verte"
          placeholderTextColor={"#B8B8B8"}
          value={title}
          style={styles.textInput}
          onChangeText={(text) => {
            setTitle(text);
          }}
        />
        <View style={styles.blackSeparation}></View>
        <Text style={styles.label}>Décris ton article</Text>
        <TextInput
          placeholder="ex : Porté quelques fois, taille correctement"
          placeholderTextColor={"#B8B8B8"}
          value={description}
          style={styles.textInputDesc}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <View style={styles.blackSeparation}></View>
        <Text style={styles.label}>Marque</Text>
        <TextInput
          placeholder="ex : Nike"
          placeholderTextColor={"#B8B8B8"}
          value={brand}
          style={styles.textInput}
          onChangeText={(text) => {
            setBrand(text);
          }}
        />
        <View style={styles.blackSeparation}></View>
        <Text style={styles.label}>Taille</Text>
        <TextInput
          placeholder="ex : M, 42"
          placeholderTextColor={"#B8B8B8"}
          value={size}
          style={styles.textInput}
          onChangeText={(text) => {
            setSize(text);
          }}
        />
        <View style={styles.blackSeparation}></View>
        <Text style={styles.label}>Couleur</Text>
        <TextInput
          placeholder="ex : Vert foncé"
          placeholderTextColor={"#B8B8B8"}
          value={color}
          style={styles.textInput}
          onChangeText={(text) => {
            setColor(text);
          }}
        />
        <View style={styles.blackSeparation}></View>
        <Text style={styles.label}>État</Text>
        <TextInput
          placeholder="ex : Comme Neuf, Bon État, Satisfaisant"
          placeholderTextColor={"#B8B8B8"}
          value={state}
          style={styles.textInput}
          onChangeText={(text) => {
            setState(text);
          }}
        />
        <View style={styles.blackSeparation}></View>
        <Text style={styles.label}>Emplacement</Text>
        <TextInput
          placeholder="ex : Paris, France"
          placeholderTextColor={"#B8B8B8"}
          value={location}
          style={styles.textInput}
          onChangeText={(text) => {
            setLocation(text);
          }}
        />
        <View style={styles.blackSeparation}></View>
        <Text style={styles.label}>Prix</Text>
        <TextInput
          placeholder="20 €"
          keyboardType="numeric"
          placeholderTextColor={"#B8B8B8"}
          value={price}
          style={styles.textInput}
          onChangeText={(text) => {
            setPrice(text);
          }}
        />
        <TouchableOpacity style={styles.publishButton} onPress={handleSubmit}>
          <Text style={styles.publishButtonText}>Ajouter</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PublishScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  title: {
    color: "#E7E7E7",
    fontSize: 20,
    textAlign: "center",
    marginTop: HEIGHT * 0.01,
    paddingBottom: 10,
  },
  label: {
    color: "#E7E7E7",
    marginLeft: WIDTH * 0.03,
    fontSize: 17,
    marginTop: 10,
  },
  textInput: {
    marginLeft: WIDTH * 0.03,
    width: WIDTH * 0.94,
    marginTop: 10,
    // borderBottomColor: "#B8B8B8",
    // borderBottomWidth: 0.5,
    paddingBottom: 16,
    color: "#B8B8B8",
  },
  textInputDesc: {
    marginLeft: WIDTH * 0.03,
    width: WIDTH * 0.94,
    marginTop: 10,
    // borderBottomColor: "#B8B8B8",
    // borderBottomWidth: 0.5,
    paddingBottom: 70,
    color: "#B8B8B8",
  },
  blackSeparation: {
    height: 14,
    backgroundColor: "black",
  },
  publishButton: {
    marginLeft: WIDTH * 0.04,
    width: WIDTH * 0.92,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#449da9",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 50,
  },
  publishButtonText: {
    color: "#1E1E1E",
    fontSize: 16,
  },
});
