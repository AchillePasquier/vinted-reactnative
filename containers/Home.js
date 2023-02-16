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
  TouchableHighlight,
  VirtualizedList,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import SearchBar from "../components/Searchbar";

const WIDTH = Dimensions.get("window").width;

const Item = ({ img, price, details, navigation, id }) => (
  <View style={styles.item}>
    <TouchableOpacity
      style={styles.centerItem}
      onPress={() => {
        navigation.navigate("Product", { id: id });
      }}
      activeOpacity={0.5}
    >
      <Image style={styles.image} source={{ uri: img }}></Image>
      <View style={styles.itemDesc}>
        <View style={styles.brandSize}>
          <Text style={styles.brandSizeText}>{details[0].MARQUE} </Text>
          <Text style={styles.brandSizeText}>{details[1].TAILLE} </Text>
        </View>
        <Text style={styles.price}>{price} €</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://backend-vinted-achille.herokuapp.com/offers?limit=30&title=${search}`
        );
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <SearchBar setSearch={setSearch} />,
    });
  }, [navigation]);

  // console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "light-content" : "light-content"}
      />
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="#B8B8B8"
          style={{ paddingTop: 100 }}
        />
      ) : (
        <FlatList
          data={data.offers}
          renderItem={({ item }) => (
            <Item
              img={item.product_image.secure_url}
              price={item.product_price}
              details={item.product_details}
              navigation={navigation}
              id={item._id}
            />
          )}
          keyExtractor={(item) => item._id}
          style={styles.list}
          numColumns={2}
          initialNumToRender={8}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  list: {
    flexDirection: "row",
    width: WIDTH,
    // borderColor: "blue",
    // borderWidth: 1,
    flex: 1,
    flexWrap: "wrap",
  },
  item: {
    height: WIDTH / 1.5,
    width: WIDTH / 2,
    // borderColor: "red",
    // borderWidth: 1,
    alignItems: "center",
    marginTop: 7,
    marginBottom: 10,
  },
  centerItem: {
    width: "86%",
    height: "100%",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "80%",
    objectfit: "cover",
    borderRadius: 5,
    // borderColor: "yellow",
    // borderWidth: 1,
  },
  itemDesc: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 14,
    marginTop: 5,
    color: "#E7E7E7",
  },
  brandSize: {
    marginTop: 4,
  },
  brandSizeText: {
    fontSize: 12,
    marginTop: 1,
    color: "#B8B8B8",
  },
});
