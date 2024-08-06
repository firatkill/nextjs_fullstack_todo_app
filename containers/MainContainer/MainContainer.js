"use client";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import { drawerWidth } from "@/globalVariables";
import { Button, Divider } from "@mui/material";
import { useGlobalStore } from "@/zustand/globalStore";
import { deleteAPI } from "@/services/fetchAPI";
import { useTodoStore } from "@/zustand/todoStore";

const MainContainer = ({ children }) => {
  const handleAddModal = useGlobalStore((state) => state.handleActiveModal);
  const setTodos = useTodoStore((state) => state.setTodos);
  const clearTodos = useTodoStore((state) => state.clearTodos);
  const currentCategory = useGlobalStore((state) => state.currentTodoCategory);
  const clearCompletedHandler = () => {
    if (confirm("Are you sure you want to delete all completed todos?")) {
      const req = deleteAPI(
        `/todos/clearCompletedTodos?category=${
          currentCategory == null ? "All" : currentCategory.id
        }`
      );
      req
        .then((res) =>
          clearTodos(currentCategory == null ? "All" : currentCategory.id)
        )
        .catch((er) => console.error("Hata oluştu: " + er));
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,

          width: `calc(100% - ${drawerWidth}px)!important`,
          height: "100%",
        }}
      >
        <Toolbar />
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",

            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => {
              handleAddModal("addTodo");
            }}
            sx={{
              minWidth: "150px",
              width: "25%",
              color: "white",
              background: "green",
              border: "2px solid transparent",
              "&:hover": {
                background: "transparent",
                borderColor: "green",
                color: "green",
              },
            }}
          >
            Add Todo
          </Button>

          <Button
            onClick={clearCompletedHandler}
            sx={{
              minWidth: "150px",
              width: "25%",
              color: "white",
              background: "orange",
              border: "2px solid transparent",
              "&:hover": {
                background: "transparent",
                borderColor: "orange",
                color: "orange",
              },
            }}
          >
            Clear Completed
          </Button>
        </Box>
        <Divider />
        {children}
      </Box>
    </>
  );
};

export default MainContainer;
