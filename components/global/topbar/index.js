"use client";
import { AppBar, IconButton, Toolbar } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import Typography from "@mui/material/Typography";
import { drawerWidth } from "@/globalVariables";
import { useGlobalStore } from "@/zustand/globalStore";
import { useContext } from "react";
import { ColorModeContext } from "@/containers/themeProviderContainer";

export default function TopbarComponent() {
  const handleDrawerToggle = useGlobalStore(
    (state) => state.handleDrawerToggle
  );
  const currentTodoCategory = useGlobalStore(
    (state) => state.currentTodoCategory
  );

  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar
      sx={{
        position: "fixed",
        bgcolor: "background.default",

        opacity: 1,
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        boxShadow: 3,
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: "background.paper",
          height: 75,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography color="primary" variant="h6" noWrap component="div">
          {currentTodoCategory == null
            ? "All"
            : currentTodoCategory.categoryName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
