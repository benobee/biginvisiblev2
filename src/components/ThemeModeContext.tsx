import { createContext } from "react";

// Create a context for theme mode
export const ThemeModeContext = createContext({
  isLightMode: false,
  setIsLightMode: (value: boolean) => {}
});