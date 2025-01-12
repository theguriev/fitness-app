import Button from "@/components/Button";
import ErrorText from "@/components/ErrorText";
import Input from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View, Alert } from "react-native";
import { FormSchema, formSchema } from "./zod";
import isServerErrorResponse from "@/utils/isServerErrorResponse";
import ServerErrorMessage from "@/components/ServerErrorMessage";
import { api } from "@/lib/openapi/apiClient";

export default function RegistrationPage() {
  const [submitState, setSubmitState] = useState<ServerErrorResponse>();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmation: "",
    },
  });

  const handleRegistration = async (data: FormSchema) => {
    // Handle authentication logic here
    Alert.alert("Login Successful", `Welcome, ${data.email}!`);
    console.log("log: trying to registration with data", data);
    const request = await api.authorization("/registration", "post", {
      body: { ...data },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    if (isServerErrorResponse(response)) {
      setSubmitState(response);
    }
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
        <ErrorText>{errors.confirmation.message}</ErrorText>
      )}
      <ServerErrorMessage response={submitState} />
      <Button onPress={handleSubmit(handleRegistration)} disabled={!isValid}>
        Registration
      </Button>
      <Text className="text-slate-300 text-sm mt-4">
        Already have an account?
      </Text>
      <Link href="/login">Login</Link>
    </View>
  );
}
