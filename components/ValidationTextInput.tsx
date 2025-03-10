import React from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type ValidatedTextInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  onBlur?: () => void;
};

export default function ValidatedTextInput({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  error,
  onBlur,
}: ValidatedTextInputProps) {
  return (
    <View style={{ marginBottom: 10 }}>
      <TextInput
        style={[styles.input, error ? styles.inputError : {}]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholderTextColor="#B8B8B8"
      />
      <Text style={[styles.errorText, !error && styles.hiddenErrorText]}>
        {error || " "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#F5F5F5",
    backgroundColor: "#F5F5F5",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 2,
  },
  inputError: {
    borderColor: "#FF5252",
  },
  errorText: {
    color: "#FF5252",
    fontSize: 12,
  },
  hiddenErrorText: {
    opacity: 0, // Hide error text but keep its space
  },
});
