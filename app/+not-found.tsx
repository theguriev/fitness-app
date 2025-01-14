import { useNavigation } from "expo-router";
import { View, Text } from "react-native";
import Button from "@/components/Button";

export default function NotFoundScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className="p-8 ">
        <Text className="text-6xl mb-4 text-center">😕</Text>
        <Text className="text-2xl font-bold mb-2 text-center text-gray-800">
          Oops! Page Not Found
        </Text>
        <Text className="text-center text-gray-600 mb-6">
          The page you're looking for doesn't seem to exist.
        </Text>
        <Button onPress={() => navigation.navigate("index")}>
          Go Back Home
        </Button>
      </View>
    </View>
  );
}
