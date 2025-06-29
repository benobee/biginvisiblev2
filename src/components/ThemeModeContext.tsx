import { createContext } from "react";

interface ThemeModeContextType {
  isLightMode: boolean;
  setIsLightMode: (value: boolean) => void | undefined;
  isHomePage: boolean;
}

// Create a context for theme mode
export const ThemeModeContext = createContext({
  isLightMode: false,
  setIsLightMode: undefined as unknown,
  isHomePage: false
} as ThemeModeContextType);
