import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StepperProps {
  currentStep: number; // 1-indexed
  totalSteps: number;
  title: string;
  stepName: string;
  onMenuPress?: () => void;
}

export default function Stepper({
  currentStep,
  totalSteps,
  title,
  stepName,
  onMenuPress,
}: StepperProps) {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);

  return (
    <View style={styles.container}>
      <View style={styles.stepperWrapper}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              {
                backgroundColor:
                  index < currentStep ? colors.mainButton : colors.border,
                marginRight: index < totalSteps - 1 ? 8 : 0,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.stepInfoContainer}>
        <Text style={styles.stepCountText}>
          Bagian {currentStep}/{totalSteps}:{" "}
          <Text style={styles.stepNameText}>{stepName}</Text>
        </Text>
      </View>
    </View>
  );
}

const createStyles = (colors: any, fonts: any) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 10,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
    },
    title: {
      fontFamily: fonts.heading,
      fontSize: 32,
      fontWeight: "700",
      color: colors.text,
      flex: 1,
    },
    stepperWrapper: {
      flexDirection: "row",
      width: "100%",
      marginVertical: 16,
    },
    stepIndicator: {
      flex: 1,
      height: 6,
      borderRadius: 100,
      opacity: 0.9,
    },
    stepInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    stepCountText: {
      fontFamily: fonts.heading,
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
    },
    stepNameText: {
      fontFamily: fonts.body,
      fontSize: 16,
      fontWeight: "400",
      color: colors.secondary,
    },
  });
