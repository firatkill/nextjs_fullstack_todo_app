"use client";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { createContext, useEffect, useMemo, useState } from "react";
import {
  blue,
  deepOrange,
  green,
  orange,
  pink,
  red,
} from "@mui/material/colors";
import { useUserStore } from "@/zustand/userStore";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ThemeProviderContainer({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const userPreferences = useUserStore((state) => state.userPreferences);
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  useEffect(() => {
    if (userPreferences) {
      if (userPreferences.themeSystemDefaults) {
        setMode(prefersDarkMode ? "dark" : "light");
      } else {
        if (userPreferences.theme == "light") {
          setMode("light");
        } else {
          setMode("dark");
        }
      }
    }
  }, [userPreferences]);

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for dark mode
            primary: {
              main: "rgba(0, 0, 0, 0.87)",
            },
            divider: "rgba(0, 0, 0, 0.12)",
            background: {
              default: "#fff",
              paper: "#fff",
            },
            button: {
              add: green[500],
              addText: "#fff",
              edit: deepOrange[500],
              delete: red["A700"],
              deleteText: "#fff",
              editText: "#fff",
            },
            todoColor: {
              green: green[500],
              red: red[500],
              blue: blue[500],
              orange: orange[500],
              pink: pink[500],
              listItem: "#fffff9",
            },
            action: {
              active: "rgba(0, 0, 0, 0.54)",
              hover: "rgba(0, 0, 0, 0.04)",
              disabled: "rgba(0, 0, 0, 0.26)",
              disabledBackground: "rgba(0, 0, 0, 0.12)",
              selected: "rgba(0, 0, 0, 0.08)",
            },
            text: {
              primary: "rgba(0, 0, 0, 0.87)",
              secondary: "rgba(0, 0, 0, 0.6)",
              disabled: "rgba(0, 0, 0, 0.38)",
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: "#fff",
            },
            divider: "rgba(255, 255, 255, 0.12)",
            background: {
              default: "#121212",
              paper: "#121212",
            },
            button: {
              add: green[300],
              addText: "#fff",
              edit: deepOrange[300],
              delete: red[400],
              deleteText: "#fff",
              editText: "#fff",
            },
            todoColor: {
              green: "rgba(165, 214, 167,0.5)",
              red: "rgba(239, 154, 154,0.5)",
              blue: "rgba(144, 202, 249,0.5)",
              orange: "rgba(255, 204, 128,.5)",
              pink: "rgba(244, 143, 177,0.5)",
              listItem: "#14181F",
            },
            action: {
              active: "#fff",
              hover: "rgba(255, 255, 255, 0.08)",

              disabled: "rgba(255, 255, 255, 0.3)",
              disabledBackground: "rgba(255, 255, 255, 0.12)",
              selected: "rgba(255, 255, 255, 0.16)",
            },
            text: {
              primary: "#fff",
              secondary: "rgba(255, 255, 255, 0.7)",
              disabled: "rgba(255, 255, 255, 0.5)",
            },
          }),
    },
  });
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: (mode) => {
        setMode(mode);
      },
    }),
    []
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
