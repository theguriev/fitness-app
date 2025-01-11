import cn from "@/utils/cn";
import { ComponentProps, PropsWithChildren } from "react";
import { TouchableOpacity, Text } from "react-native";

const Button = ({
  children,
  disabled,
  onPress,
  ...rest
}: PropsWithChildren<ComponentProps<typeof TouchableOpacity>>) => (
  <TouchableOpacity
    className={cn(
      "w-full h-12 bg-black rounded-lg justify-center items-center",
      disabled && "opacity-50 pointer-events-none"
    )}
    onPress={disabled ? () => {} : onPress}
    {...rest}
  >
    <Text className="font-bold text-base text-white">{children}</Text>
  </TouchableOpacity>
);

export default Button;
