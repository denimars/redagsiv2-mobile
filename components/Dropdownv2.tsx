import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export interface Option {
  label: string;
  value: string | number;
}

export interface DropdownProps {
  label?: string;
  options: Option[];
  selectedValue: string | number;
  onValueChange: (value: string | number) => void;
  placeholder?: string;
}

export default function Dropdownv2({
  label,
  options,
  selectedValue,
  onValueChange,
  placeholder = "Select an option",
}: DropdownProps) {
  const { colors, fonts } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const toggleModal = () => setModalVisible(!modalVisible);

  const handleSelect = (value: string | number) => {
    onValueChange(value);
    setModalVisible(false);
  };

  const styles = createStyles(colors, fonts);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={toggleModal}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.selectedText,
            !selectedOption && { color: colors.text + "80" },
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons
          name={modalVisible ? "chevron-up" : "chevron-down"}
          size={18}
          color={colors.text}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={options}
                keyExtractor={(item) => item.value.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.optionItem,
                      item.value === selectedValue && styles.selectedOptionItem,
                    ]}
                    onPress={() => handleSelect(item.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        item.value === selectedValue &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {item.value === selectedValue && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={colors.mainButton}
                      />
                    )}
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContent}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const createStyles = (colors: any, fonts: any) =>
  StyleSheet.create({
    container: {
      marginVertical: 8,
      width: "100%",
    },
    label: {
      fontSize: 14,
      fontFamily: fonts.body,
      color: colors.text,
      marginBottom: 4,
    },
    dropdownButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: colors.mainButton,
      paddingVertical: 8,
      height: 48,
    },
    selectedText: {
      fontSize: 16,
      fontFamily: fonts.body,
      color: colors.text,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    modalContent: {
      width: "100%",
      maxHeight: "50%",
      backgroundColor: colors.card,
      borderRadius: 24,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
    },
    listContent: {
      paddingVertical: 8,
    },
    optionItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + "40",
    },
    selectedOptionItem: {
      backgroundColor: colors.mainButton + "10",
    },
    optionText: {
      fontSize: 16,
      fontFamily: fonts.body,
      color: colors.text,
    },
    selectedOptionText: {
      color: colors.mainButton,
      fontWeight: "bold",
    },
  });
