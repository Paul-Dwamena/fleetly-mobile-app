import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { COLORS } from "../app/colors";

export default function Button({ title, onPress, type = "primary" }) {
  const background =
    type === "primary"
      ? COLORS.primary
      : type === "danger"
      ? COLORS.danger
      : COLORS.dark;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: background,
        padding: 12,
        borderRadius: 8,
        marginVertical: 5,
      }}
    >
      <Text style={{ color: "#fff", textAlign: "center" }}>{title}</Text>
    </TouchableOpacity>
  );
}