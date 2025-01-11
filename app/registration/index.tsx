import Button from "@/components/Button";
import Input from "@/components/Input";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View, Alert } from "react-native";

type RegistrationFormInputs = {
  email: string;
  password: string;
  confirmation: string;
};

export default function RegistrationPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInputs>();

  const handleLogin = (data: RegistrationFormInputs) => {
    // Handle authentication logic here
    Alert.alert("Login Successful", `Welcome, ${data.email}!`);
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
            placeholder="Email will be taken as login"
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
      <Controller
        control={control}
        name="confirmation"
        rules={{
          required: "Confirmation password is required",
          minLength: {
            value: 6,
            message: "Confirmation password must be at least 6 characters long",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            error={Boolean(errors.password)}
            placeholder="Confirmation"
            placeholderTextColor="#aaa"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.confirmation && (
        <Text className="text-red-600 text-sm mb-2">
          {errors.confirmation.message}
        </Text>
      )}
      <Button onPress={handleSubmit(handleLogin)}>Registration</Button>
      <Text className="text-slate-300 text-sm mt-4">
        Already have an account?
      </Text>
      <Link href="/login">Login</Link>
    </View>
  );
}
