
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface ProfileMenuItemProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBgColor: string;
  onPress: () => void;
  isDanger?: boolean;
}

interface ProfileMenuSectionProps {
  title: string;
  items: ProfileMenuItemProps[];
}

export default function ProfileMenuSection({
  title,
  items,
}: ProfileMenuSectionProps) {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.menuContainer}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.iconBgColor },
                ]}
              >
                <Ionicons name={item.icon} size={20} color={item.iconColor} />
              </View>
              <Text
                style={[styles.menuText, item.isDanger && { color: "#DC2626" }]}
              >
                {item.label}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.secondary}
              />
            </TouchableOpacity>
            {index < items.length - 1 && <View style={styles.menuDivider} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const createStyles = (colors: any, fonts: any) =>
  StyleSheet.create({
    section: {
      marginBottom: 0,
    },
    sectionTitle: {
      fontFamily: fonts.heading,
      fontSize: 17,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 14,
      marginLeft: 4,
      opacity: 0.9,
    },
    menuContainer: {
      backgroundColor: colors.card,
      borderRadius: 24,
      marginBottom: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.05,
      shadowRadius: 15,
      elevation: 4,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border || "#f0f0f0",
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 18,
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    menuText: {
      flex: 1,
      fontFamily: fonts.body,
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    menuDivider: {
      height: 1,
      backgroundColor: colors.border || "#F3F4F6",
      marginLeft: 78,
      opacity: 0.5,
    },
  });
