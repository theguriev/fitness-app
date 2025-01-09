import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/Input";
import Button from "@/components/Button";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
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
      {errors.email && (
        <Text className="text-red-600 text-sm mb-2">
          {errors.email.message}
        </Text>
      )}
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
      {errors.password && (
        <Text className="text-red-600 text-sm mb-2">
          {errors.password.message}
        </Text>
      )}
      <Button onPress={handleSubmit(onSubmit)}>Login</Button>
      <Text className="text-slate-300 text-sm">Don't have an account?</Text>
      <Link href="/registration">Sign up</Link>
    </View>
  );
}
