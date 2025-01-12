import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, View, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ErrorText from "@/components/ErrorText";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormSchema } from "./zod";
import { formSchema } from "./zod";
import ServerErrorMessage from "../../components/ServerErrorMessage";
import isServerErrorResponse from "@/utils/isServerErrorResponse";
import { api } from "@/lib/openapi/apiClient";

export default function LoginPage() {
  const [submitState, setSubmitState] = useState<ServerErrorResponse>();
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

  const onSubmit = async (data: FormSchema) => {
    Alert.alert("Success", `Logged in with email: ${data.email}`);
    console.log("log: trying to login with data", data);
    const request = await api.authorization("/login", "post", {
      body: data,
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
      <ServerErrorMessage response={submitState} />
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
