import { Ionicons } from "@expo/vector-icons";
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
  value: string | number;
}

interface CheckboxProps {
  label?: string;
  title?: string;
  checked: boolean;
  onValueChange: (checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  label?: string;
  options: Option[];
  selectedValues: (string | number)[];
  onValueChange: (values: (string | number)[]) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

/**
 * A premium Checkbox component with support for titles and labels.
 * Designed to match the app's theme and visual style.
 */
export default function Checkbox({
  label,
  title,
  checked,
  onValueChange,
  style,
  labelStyle,
  titleStyle,
  disabled = false,
}: CheckboxProps) {
  const { colors, fonts } = useTheme();

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!checked);
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
        style={styles.checkboxContainer}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.checkbox,
            {
              borderColor: checked ? colors.mainButton : colors.border,
              backgroundColor: checked ? colors.mainButton : "transparent",
            },
            disabled && styles.disabledCheckbox,
          ]}
        >
          {checked && (
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
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

/**
 * A group of Checkboxes for multiple dynamic choices.
 */
export function CheckboxGroup({
  label,
  options,
  selectedValues,
  onValueChange,
  style,
  disabled = false,
}: CheckboxGroupProps) {
  const { colors, fonts } = useTheme();

  const handleToggle = (value: string | number) => {
    if (selectedValues.includes(value)) {
      onValueChange(selectedValues.filter((v) => v !== value));
    } else {
      onValueChange([...selectedValues, value]);
    }
  };

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
          <Checkbox
            key={option.value.toString()}
            label={option.label}
            checked={selectedValues.includes(option.value)}
            onValueChange={() => handleToggle(option.value)}
            disabled={disabled}
            style={styles.groupItem}
          />
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    flexShrink: 1,
  },
  groupContainer: {
    marginTop: 4,
  },
  groupItem: {
    marginVertical: 4,
  },
  disabledCheckbox: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
});
