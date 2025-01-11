import cn from "@/utils/cn";
import { ComponentProps } from "react";
import { TextInput } from "react-native";

const Input = ({
  error,
  className,
  ...rest
}: { error?: boolean } & ComponentProps<typeof TextInput>) => {
  return (
    <TextInput
      className={cn(
        className,
        "w-full h-12 bg-white rounded-md px-4 mb-2 border border-gray-300 text-bold focus:border-gray-900",
        error && "border-red-500"
      )}
      {...rest}
    />
  );
};

export default Input;
