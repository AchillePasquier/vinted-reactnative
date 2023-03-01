import * as React from "react";
import { View, Text, Button } from "react-native";

function StartedScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "black", fontSize: 50 }}>Started screen</Text>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      /> */}
    </View>
  );
}

export default StartedScreen;
