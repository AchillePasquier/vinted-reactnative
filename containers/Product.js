import * as React from "react";
import {
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  Platform,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import Ionicons from "@expo/vector-icons/Ionicons";

const WIDTH = Dimensions.get("window").width;

const ProductScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/offer/${route.params.id}`
        );
        //console.log(response.data);
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />

      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="#B8B8B8"
          style={{ paddingTop: 100 }}
        />
      ) : (
        <ScrollView>
          <ImageBackground
            source={{ uri: data.product_image.secure_url }}
            resizeMode="cover"
            style={styles.imagebgrd}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                style={styles.goback}
                size={28}
                color="#1E1E1E"
              />
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.username}>
            <View style={styles.firstLetterDiv}>
              <Text style={styles.firstLetter}>
                {data.owner.account.username[0]}
              </Text>
            </View>
            <Text style={styles.pseudo}>{data.owner.account.username}</Text>
            <Ionicons
              name="chatbubbles-outline"
              style={styles.chatIcon}
              size={28}
              color="#449da9"
            />
          </View>
          <View style={styles.informations}>
            <Text style={styles.title}>{data.product_name}</Text>
            <Text style={styles.details}>
              {data.product_details[1].TAILLE} - {data.product_details[2].ÉTAT}{" "}
              - {data.product_details[0].MARQUE}
            </Text>
            <Text style={styles.details}>{data.product_description}</Text>
            <Text style={styles.price}>{data.product_price} €</Text>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => {
                navigation.navigate("Payment", {
                  name: data.product_name,
                  price: data.product_price,
                });
              }}
            >
              <Text style={styles.buyButtonText}>Acheter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  imagebgrd: {
    width: WIDTH,
    height: WIDTH,
  },
  goback: {
    position: "absolute",
    top: 55,
    left: WIDTH * 0.045,
  },
  informations: {
    marginLeft: WIDTH * 0.04,
    width: WIDTH * 0.92,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  username: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderBottomWidth: 1,
    borderColor: "#2e2e2e",
  },
  firstLetterDiv: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "#ef6b00",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: WIDTH * 0.04,
  },
  firstLetter: {
    color: "#E7E7E7",
    fontSize: 20,
  },
  pseudo: {
    color: "#E7E7E7",
    marginLeft: WIDTH * 0.04,
    fontSize: 16,
  },
  chatIcon: {
    right: WIDTH * 0.04,
    position: "absolute",
  },
  title: {
    color: "#E7E7E7",
    fontSize: 16,
    marginTop: 15,
  },
  details: {
    color: "#B8B8B8",
    marginTop: 15,
    fontSize: 14,
  },
  price: {
    color: "#E7E7E7",
    marginTop: 15,
    fontSize: 16,
  },
  buyButton: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#449da9",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buyButtonText: {
    color: "#1E1E1E",
    fontSize: 16,
  },
});
