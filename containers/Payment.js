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
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";

const WIDTH = Dimensions.get("window").width;

import Ionicons from "@expo/vector-icons/Ionicons";

const PaymentScreen = ({ route, navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`http://localhost:4000/payment-sheet`, {
      method: "POST",
      body: JSON.stringify({ items: [{ total: total }] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const { name, price } = route.params;
  let total = (price + price * 0.1 + 3.2).toFixed(2);

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
          color="#B8B8B8"
        />
      </TouchableOpacity>
      <ScrollView>
        <Text style={styles.title}>Résumé de la commande</Text>
        <View style={styles.orderedLine}>
          <Text style={styles.detailOrder}>Article</Text>
          <Text style={styles.detailOrder}>{price} €</Text>
        </View>
        <View style={styles.orderedLine}>
          <Text style={styles.detailOrder}>Frais de protection acheteur</Text>
          <Text style={styles.detailOrder}>{(price * 0.1).toFixed(2)} €</Text>
        </View>
        <View style={styles.orderedLine}>
          <Text style={styles.detailOrder}>Envoi</Text>
          <Text style={styles.detailOrder}>3.20 €</Text>
        </View>
        <View style={styles.totalLine}>
          <Text style={styles.totalOrder}>Total</Text>
          <Text style={styles.totalOrder}>{total} €</Text>
        </View>
        <Text style={styles.resume}>
          Il ne vous reste plus qu'une étape pour vous offrir "{name}". Vous
          allez payer {total} € (frais de protection des frais de port inclus).
        </Text>
        <StripeProvider
          publishableKey="pk_test_51MeGHPIr9kBL5nQG96njcyR7gWOvXkBglWC0cE2s1SOXfM3SeBMrQEPlGHhi84pCCwor3IAXIdJpeebi4w5y2HPr00ixVT2irf"
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
          merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
        >
          <TouchableOpacity
            style={styles.payButton}
            // onPress={() => Alert.alert("Achat effectué")}
            disabled={!loading}
            onPress={openPaymentSheet}
          >
            <Text style={styles.payButtonText}>Payer</Text>
          </TouchableOpacity>
        </StripeProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  goback: {
    position: "relative",
    marginLeft: WIDTH * 0.045,
    marginTop: 15,
  },
  title: {
    color: "#B8B8B8",
    marginLeft: WIDTH * 0.04,
    marginTop: 15,
    marginBottom: 20,
    fontSize: 18,
  },
  orderedLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: WIDTH * 0.04,
    width: WIDTH * 0.92,
    marginTop: 10,
  },
  detailOrder: {
    color: "#B8B8B8",
    fontSize: 15,
  },
  totalLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: WIDTH * 0.04,
    width: WIDTH * 0.92,
    marginTop: 20,
  },
  totalOrder: {
    color: "#E7E7E7",
    fontSize: 15,
  },
  resume: {
    marginLeft: WIDTH * 0.04,
    width: WIDTH * 0.92,
    color: "#B8B8B8",
    fontSize: 15,
    marginTop: 25,
  },
  payButton: {
    marginLeft: WIDTH * 0.04,
    width: WIDTH * 0.92,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#449da9",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  payButtonText: {
    color: "#1E1E1E",
    fontSize: 16,
  },
});
