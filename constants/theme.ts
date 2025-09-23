/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  text: '#1c1c1c',
  background: '#f9f9f9',
  mainButton: '#c8a75a',
  icon: '#1e3a8a',
  card: '#ffffff',
  border: '#e5e5e5',
  secondary: '#6b7280',
  tabBar: '#1B3C53',
  tabBarInActive: '#ffffff',
};

export const Fonts = {
  // Body text - Inter Regular
  body: Platform.select({
    ios: 'Inter-Regular',
    android: 'Inter-Regular',
    default: 'Inter, system-ui, -apple-system, sans-serif',
  }),
  
  // Heading & Button - Inter Bold/Medium
  heading: Platform.select({
    ios: 'Inter-Bold',
    android: 'Inter-Bold', 
    default: 'Inter, system-ui, -apple-system, sans-serif',
  }),
  
  button: Platform.select({
    ios: 'Inter-Medium',
    android: 'Inter-Medium',
    default: 'Inter, system-ui, -apple-system, sans-serif',
  }),
  
  // Numbers & Time - Roboto Mono / JetBrains Mono
  mono: Platform.select({
    ios: 'RobotoMono-Regular',
    android: 'RobotoMono-Regular',
    default: 'JetBrains Mono, Roboto Mono, Consolas, monospace',
  }),
  
  // Legacy support
  sans: Platform.select({
    ios: 'Inter-Regular',
    android: 'Inter-Regular',
    default: 'Inter, system-ui, sans-serif',
  }),
};
