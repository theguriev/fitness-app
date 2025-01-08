import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

import "../global.css";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text className="flex p-7 font-bold">Home</Text>
      <Link href="/login">View details</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
