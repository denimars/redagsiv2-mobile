import React, { createContext, useContext, ReactNode } from 'react';
import { Colors, Fonts } from '../constants/theme';

interface ThemeContextType {
  colors: typeof Colors;
  fonts: typeof Fonts;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = {
    colors: Colors,
    fonts: Fonts,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}