import React from "react";
import { View, Text, Button } from "react-native";

export default function RequestScreen() {
  const submitInspection = async () => {
    console.log("Submit inspection");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Vehicle Inspection</Text>

      <Button title="Submit Inspection" onPress={submitInspection} />
    </View>
  );
}