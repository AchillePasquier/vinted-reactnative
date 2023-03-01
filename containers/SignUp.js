import * as React from "react";
import { View, Text, Button } from "react-native";

function SignUpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Sign Up screen</Text>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      /> */}
    </View>
  );
}

export default SignUpScreen;
