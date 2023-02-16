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
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

const WIDTH = Dimensions.get("window").width;

const ProductScreen = ({ route }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://backend-vinted-achille.herokuapp.com/offer/${route.params.id}`
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
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#EB5A62"
          style={{ paddingTop: 100 }}
        />
      ) : (
        <ScrollView>
          <Text>This is the {data.product_name}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
