import { TextInput, StyleSheet, Dimensions, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const WIDTH = Dimensions.get("window").width;

const SearchBar = (setSearch) => {
  return (
    <View style={styles.searchBar}>
      <Ionicons
        name="search"
        style={styles.maglass}
        size={20}
        color="#B8B8B8"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Rechercher un article"
        placeholderTextColor={"#B8B8B8"}
        keyboardType="default"
        inputMode="search"
        keyboardAppearance="dark"
        returnKeyType="search"
        // defaultValue=""
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    height: WIDTH * 0.1,
    width: WIDTH * 0.9,
    marginTop: 0,
    backgroundColor: "#121212",
    color: "#B8B8B8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },
  maglass: {
    marginLeft: 10,
  },
  textInput: {
    width: "89%",
    height: "100%",
    color: "#B8B8B8",
    fontSize: 16,
    // borderColor: "blue",
    // borderWidth: 1,
  },
});
