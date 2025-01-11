import { Link } from "expo-router";
import React from "react";
import { Text, View, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ErrorText from "@/components/ErrorText";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormSchema } from "./zod";
import { formSchema } from "./zod";

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    Alert.alert("Success", `Logged in with email: ${data.email}`);
  };

  return (
    <View className="flex-1 justify-center items-center bg-slate-50 p-4">
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            error={Boolean(errors.email)}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            error={Boolean(errors.password)}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      <Button onPress={handleSubmit(onSubmit)} disabled={!isValid}>
        Login
      </Button>
      <Text className="text-slate-300 text-sm mt-4">
        Don't have an account?
      </Text>
      <Link href="/registration">Sign up</Link>
    </View>
  );
}
