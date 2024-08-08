"use client";
import { AppBar, Button, IconButton, Toolbar, useTheme } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import Typography from "@mui/material/Typography";
import { drawerWidth } from "@/globalVariables";
import { useGlobalStore } from "@/zustand/globalStore";
import { useContext } from "react";
import { ColorModeContext } from "@/containers/ThemeProviderContainer";

export default function TopbarComponent() {
  const handleDrawerToggle = useGlobalStore(
    (state) => state.handleDrawerToggle
  );
  const currentTodoCategory = useGlobalStore(
    (state) => state.currentTodoCategory
  );

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar
      position="fixed"
      sx={{
        color: "unset",
        backgroundColor: "unset",
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          height: 75,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {currentTodoCategory == null
            ? "All"
            : currentTodoCategory.categoryName}
        </Typography>
        <Button
          onClick={colorMode.toggleColorMode}
          variant="contained"
          sx={{
            "&:hover": {},
          }}
        >
          Change Theme
        </Button>
      </Toolbar>
    </AppBar>
  );
}
