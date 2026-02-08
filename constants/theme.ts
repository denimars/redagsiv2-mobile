/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const LightThemes = {
  gold: {
    text: "#1c1c1c",
    textSecondary: "#1c1c1c",
    background: "#f9f9f9",
    mainButton: "#c8a75a",
    icon: "#1e3a8a",
    card: "#ffffff",
    border: "#e5e5e5",
    secondary: "#6b7280",
    tabBar: "#1B3C53",
    tabBarInActive: "#ffffff",
  },
  dark: {
    text: "#f9f9f9",
    textSecondary: "#1c1c1c",
    background: "#121212",
    mainButton: "#c8a75a",
    icon: "#c8a75a",
    card: "#1e1e1e",
    border: "#333333",
    secondary: "#9ca3af",
    tabBar: "#000000",
    tabBarInActive: "#888888",
  },
};

export type ThemeType = keyof typeof LightThemes;

export const Colors = LightThemes.gold;

export const Fonts = {
  // Body text - Outfit Regular
  body: Platform.select({
    ios: "Outfit_400Regular",
    android: "Outfit_400Regular",
    default: "Outfit, system-ui, -apple-system, sans-serif",
  }),

  // Heading & Button - Outfit Bold/Medium
  heading: Platform.select({
    ios: "Outfit_700Bold",
    android: "Outfit_700Bold",
    default: "Outfit, system-ui, -apple-system, sans-serif",
  }),

  button: Platform.select({
    ios: "Outfit_500Medium",
    android: "Outfit_500Medium",
    default: "Outfit, system-ui, -apple-system, sans-serif",
  }),

  // Numbers & Time - Roboto Mono / JetBrains Mono
  mono: Platform.select({
    ios: "RobotoMono-Regular",
    android: "RobotoMono-Regular",
    default: "JetBrains Mono, Roboto Mono, Consolas, monospace",
  }),

  // Legacy support
  sans: Platform.select({
    ios: "Outfit_400Regular",
    android: "Outfit_400Regular",
    default: "Outfit, system-ui, sans-serif",
  }),
};
