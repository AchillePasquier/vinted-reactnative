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
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;

import Ionicons from "@expo/vector-icons/Ionicons";

function DetailsScreen({ userId, userToken }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const navigation = useNavigation();

  // console.log(userId);
  // console.log(userToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/user/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        //console.log(response.data);
        setData(response.data);
        console.log(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "light-content" : "light-content"}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        style={styles.goback2}
      >
        <Ionicons
          name="arrow-back"
          style={styles.goback}
          size={28}
          color="#1E1E1E"
        />
      </TouchableOpacity>
      <Text style={styles.title}>Informations du compte</Text>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="#B8B8B8"
          style={{ paddingTop: 100 }}
        />
      ) : (
        <ScrollView>
          <Text style={styles.label}>Pseudo :</Text>
          <Text style={styles.informations}>{data.username}</Text>
          <Text style={styles.label}>Adresse e-mail :</Text>
          <Text style={styles.informations}>{data.email}</Text>
          <Text style={styles.label}>Identifiant :</Text>
          <Text style={styles.informations}>{data.id}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  goback2: {
    backgroundColor: "blue",
  },
  goback: {
    position: "absolute",
    top: 16,
    color: "#E7E7E7",
    left: WIDTH * 0.045,
  },
  title: {
    textAlign: "center",
    color: "#E7E7E7",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 25,
  },
  label: {
    color: "#B8B8B8",
    fontSize: 17,
    marginLeft: WIDTH * 0.05,
    marginTop: 15,
  },
  informations: {
    color: "#E7E7E7",
    fontSize: 17,
    marginLeft: WIDTH * 0.05,
    marginTop: 3,
  },
});
