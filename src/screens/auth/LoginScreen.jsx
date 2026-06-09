import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import api from "../../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slices/authSlice";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const login = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      await AsyncStorage.setItem("token", res.data.token);

      dispatch(setAuth(res.data));

      navigation.replace("Main");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={login} />
    </View>
  );
}