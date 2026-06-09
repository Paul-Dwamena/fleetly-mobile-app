import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Driver Dashboard</Text>

      <Button title="Start Inspection" onPress={() => {}} />
      <Button title="Report Issue" onPress={() => {}} />
      <Button title="Fuel Request" onPress={() => {}} />
    </View>
  );
}