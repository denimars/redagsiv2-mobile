import { Ionicons } from "@expo/vector-icons";
import React, { useState, useMemo } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput as RNTextInput,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export interface Option {
  label: string;
  value: string | number;
}

export interface DropdownSearchProps {
  label?: string;
  options: Option[];
  selectedValue: string | number;
  onValueChange: (value: string | number) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  error?: string;
  disabled?: boolean;
}

export default function DropdownSearch({
  label,
  options,
  selectedValue,
  onValueChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  error,
  disabled = false,
}: DropdownSearchProps) {
  const { colors, fonts } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    if (!modalVisible) {
      setSearchQuery(""); // Reset search when opening
    }
  };

  const handleSelect = (value: string | number) => {
    onValueChange(value);
    setModalVisible(false);
  };

  const styles = createStyles(colors, fonts);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          error ? { borderBottomColor: "#EF4444" } : {},
          disabled && styles.disabledButton,
        ]}
        onPress={toggleModal}
        activeOpacity={disabled ? 1 : 0.7}
        disabled={disabled}
      >
        <Text
          style={[
            styles.selectedText,
            !selectedOption && { color: colors.text + "80" },
          ]}
          numberOfLines={1}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons
          name={modalVisible ? "chevron-up" : "chevron-down"}
          size={18}
          color={colors.text}
        />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.searchContainer}>
                  <Ionicons
                    name="search"
                    size={20}
                    color={colors.text + "60"}
                    style={styles.searchIcon}
                  />
                  <RNTextInput
                    style={styles.searchInput}
                    placeholder={searchPlaceholder}
                    placeholderTextColor={colors.text + "60"}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus={true}
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                      <Ionicons
                        name="close-circle"
                        size={20}
                        color={colors.text + "60"}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <FlatList
                  data={filteredOptions}
                  keyExtractor={(item) => item.value.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.optionItem,
                        item.value === selectedValue &&
                          styles.selectedOptionItem,
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
                  ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>No results found</Text>
                    </View>
                  }
                />
              </View>
            </TouchableWithoutFeedback>
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
      flex: 1,
      marginRight: 8,
    },
    errorText: {
      color: "#EF4444",
      fontSize: 12,
      marginTop: 4,
      fontFamily: fonts.body,
    },
    disabledButton: {
      opacity: 0.5,
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
      maxHeight: "70%",
      backgroundColor: colors.card,
      borderRadius: 24,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
      paddingTop: 16,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      marginHorizontal: 16,
      marginBottom: 12,
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 48,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: "100%",
      fontSize: 16,
      fontFamily: fonts.body,
      color: colors.text,
    },
    listContent: {
      paddingBottom: 16,
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
    emptyContainer: {
      padding: 40,
      alignItems: "center",
    },
    emptyText: {
      fontSize: 14,
      fontFamily: fonts.body,
      color: colors.text + "80",
    },
  });
