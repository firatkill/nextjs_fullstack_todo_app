"use client";
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import Typography from "@mui/material/Typography";
import { drawerWidth } from "@/globalVariables";
import { useGlobalStore } from "@/zustand/globalStore";
import { red } from "@mui/material/colors";
import { useCategoryStore } from "@/zustand/categoryStore";
import { deleteAPI } from "@/services/fetchAPI";
import { useTodoStore } from "@/zustand/todoStore";

export default function TopbarComponent() {
  const handleDrawerToggle = useGlobalStore(
    (state) => state.handleDrawerToggle
  );
  const currentTodoCategory = useGlobalStore(
    (state) => state.currentTodoCategory
  );
  const deleteTodoCategory = useCategoryStore(
    (state) => state.deleteTodoCategory
  );
  const changeCurrentCategory = useGlobalStore(
    (state) => state.changeCurrentCategory
  );
  const deleteTodosByCategory = useTodoStore(
    (state) => state.deleteTodosByCategory
  );
  const deleteHandler = (e) => {
    e.preventDefault();
    if (
      confirm(
        "Are you sure you want to delete this category? You will lose all your todos of this category. This can't be undone."
      )
    ) {
      const req = deleteAPI(
        `/categories/deleteCategory?id=${currentTodoCategory.id}`
      );
      req
        .then((res) => {
          deleteTodoCategory(currentTodoCategory.id);
          deleteTodosByCategory(currentTodoCategory.id);
          changeCurrentCategory(null);
        })
        .catch((er) => console.error("Hata oluştu: " + er));
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{ height: 75, display: "flex", justifyContent: "space-between" }}
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

        {currentTodoCategory != null && (
          <Button
            onClick={deleteHandler}
            variant="contained"
            sx={{
              color: "white",
              background: red[800],
              "&:hover": {
                background: "white",
                color: red[800],
              },
            }}
          >
            Delete Category
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
