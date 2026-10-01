import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export interface Option {
  label: string;
  value: string | number | boolean;
}

interface RadioProps {
  label?: string;
  title?: string;
  selected: boolean;
  onValueChange: (checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

interface RadioGroupProps {
  label?: string;
  options: Option[];
  selectedValue: string | number | boolean | null;
  onValueChange: (value: string | number | boolean) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export default function Radio({
  label,
  title,
  selected,
  onValueChange,
  style,
  labelStyle,
  titleStyle,
  disabled = false,
}: RadioProps) {
  const { colors, fonts } = useTheme();

  const handlePress = () => {
    if (!disabled && !selected) {
      onValueChange(true);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {title && (
        <Text
          style={[
            styles.title,
            { color: colors.text, fontFamily: fonts.heading },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      )}
      <TouchableOpacity
        style={styles.radioContainer}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.radio,
            {
              borderColor: selected ? colors.mainButton : colors.border,
            },
            disabled && styles.disabledRadio,
          ]}
        >
          {selected && (
            <View
              style={[
                styles.radioInner,
                { backgroundColor: colors.mainButton },
              ]}
            />
          )}
        </View>
        {label && (
          <Text
            style={[
              styles.label,
              { color: colors.text, fontFamily: fonts.body },
              labelStyle,
              disabled && styles.disabledText,
            ]}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export function RadioGroup({
  label,
  options,
  selectedValue,
  onValueChange,
  style,
  disabled = false,
}: RadioGroupProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text
          style={[
            styles.title,
            { color: colors.text, fontFamily: fonts.heading },
          ]}
        >
          {label}
        </Text>
      )}
      <View style={styles.groupContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value.toString()}
            style={styles.radioContainer}
            onPress={() => onValueChange(option.value)}
            disabled={disabled}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radio,
                {
                  borderColor:
                    selectedValue === option.value
                      ? colors.mainButton
                      : colors.border,
                },
                disabled && styles.disabledRadio,
              ]}
            >
              {selectedValue === option.value && (
                <View
                  style={[
                    styles.radioInner,
                    { backgroundColor: colors.mainButton },
                  ]}
                />
              )}
            </View>
            <Text
              style={[
                styles.label,
                { color: colors.text, fontFamily: fonts.body },
                disabled && styles.disabledText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "100%",
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  label: {
    fontSize: 16,
    flexShrink: 1,
  },
  groupContainer: {
    marginTop: 4,
  },
  disabledRadio: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
});
