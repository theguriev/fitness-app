import { ComponentProps, PropsWithChildren } from "react";
import { TouchableOpacity, Text } from "react-native";

const Button = ({
  children,
  ...rest
}: PropsWithChildren<ComponentProps<typeof TouchableOpacity>>) => {
  return (
    <TouchableOpacity
      className="w-full h-12 bg-[#000000] rounded-lg justify-center items-center"
      {...rest}
    >
      <Text className="font-bold text-base text-white">{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
