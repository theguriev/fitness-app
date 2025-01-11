import { PropsWithChildren } from "react";
import { View, Text } from "react-native";

const ErrorText = ({ children }: PropsWithChildren) => {
  return (
    <View className="w-full text-left mb-2">
      <Text className="text-red-600 text-sm mb-2">{children}</Text>
    </View>
  );
};

export default ErrorText;
