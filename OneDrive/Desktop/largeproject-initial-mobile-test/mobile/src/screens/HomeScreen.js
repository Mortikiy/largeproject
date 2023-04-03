import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LogoImage from "../assets/logo.svg";
import TabNavigator from "../navigation/TabNavigator";

export default function HomeScreen() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetch("https://obscure-springs-89188.herokuapp.com/api/getRandomDrink")
      .then((response) => response.json())
      .then((data) => setDrinks(data))
      .catch((error) => console.error(error));
  }, []);

  const screenWidth = Dimensions.get("window").width;

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/gradient.png")}
    >
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={styles.header}>
          Here are some random drinks you should try:
        </Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.drinksContainer}>
            {drinks.map((drink, index) => (
              <View
                key={index}
                style={[styles.drink, { width: screenWidth - 20 }]}
              >
                {drink.img ? (
                  <Image
                    source={{ uri: drink.img }}
                    style={styles.drinkImage}
                  />
                ) : null}
                <Text style={styles.drinkName}>{drink.name}</Text>
                <Text style={styles.ingredients}>
                  Ingredients: {drink.ingNeeded.join(", ")}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  drinksContainer: {
    alignItems: "center",
  },
  drink: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  drinkName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ingredients: {
    fontSize: 12,
  },
  drinkImage: {
    width: "100%",
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
});
