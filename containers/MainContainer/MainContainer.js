"use client";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import { drawerWidth } from "@/globalVariables";
import { Button, Divider } from "@mui/material";
import { useGlobalStore } from "@/zustand/globalStore";
import { deleteAPI, getAPI } from "@/services/fetchAPI";
import { useTodoStore } from "@/zustand/todoStore";
import TopbarComponent from "@/components/global/topbar";
import SidebarContainer from "../sidebarContainer";
import SidebarComponent from "@/components/global/sidebar";
import { signOut, useSession } from "next-auth/react";
import { useUserStore } from "@/zustand/userStore";
import { useEffect } from "react";
import ModalWrapper from "../modalWrapper";
import SpinnerComponent from "@/components/global/spinner";
import { redirect } from "next/navigation";

const MainContainer = ({ children }) => {
  const handleAddModal = useGlobalStore((state) => state.handleActiveModal);
  const setTodos = useTodoStore((state) => state.setTodos);
  const openSnackbar = useGlobalStore((state) => state.openSnackbar);

  const clearTodos = useTodoStore((state) => state.clearTodos);
  const currentCategory = useGlobalStore((state) => state.currentTodoCategory);
  const session = useSession();
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const setLoading = useGlobalStore((state) => state.handleLoading);
  const setUserPreferences = useUserStore((state) => state.setUserPreferences);
  const clearCompletedHandler = () => {
    if (confirm("Are you sure you want to delete all completed todos?")) {
      setLoading(true);
      const req = deleteAPI(
        `/todos/clearCompletedTodos?category=${
          currentCategory == null ? "All" : currentCategory.id
        }`
      );
      req
        .then((res) => {
          if (res.success) {
            clearTodos(currentCategory == null ? "All" : currentCategory.id);
            // SNACKBAR res.message
            openSnackbar({ severity: "success", text: res.message });
          } else {
            // SNACKBAR res.error
            openSnackbar({ severity: "error", text: res.error });
          }
        })
        .catch((er) => console.error("Hata oluştu: " + er))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (session.status == "authenticated" && session.data.user) {
      setLoading(true);
      const userToSet = {
        id: session.data.user.id,
        name: session.data.user.name,
      };
      const userPreferencesData = getAPI("/userPreferences/getUserPreferences");
      userPreferencesData
        .then((res) => {
          if (res.success) {
            setUserPreferences(res.userPreferences);
            setCurrentUser(userToSet);
            // SNACKBAR res.message
          } else {
            // SNACKBAR res.error
            openSnackbar({ severity: "error", text: res.error });
          }
        })
        .catch((er) => {
          console.error("Hata Oluştu: " + er);
          signOut();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [session.status]);

  if (session.status == "unauthenticated") {
    redirect("/auth/login");
  }
  if (session.status == "loading") {
    return <SpinnerComponent loading={true} />;
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <TopbarComponent />
        <SidebarContainer>
          <SidebarComponent />
        </SidebarContainer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,

            width: `calc(100% - ${drawerWidth}px)!important`,
            height: "100vh",

            overflowY: "hidden",
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

                color: "button.addText",
                backgroundColor: "button.add",

                boxShadow: 3,
                "&:hover": {
                  backgroundColor: "button.addText",
                  color: "button.add",
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

                color: "button.editText",
                backgroundColor: "button.edit",

                boxShadow: 3,
                "&:hover": {
                  backgroundColor: "button.editText",
                  color: "button.edit",
                },
              }}
            >
              Clear Completed
            </Button>
          </Box>
          <Divider />
          {children}
        </Box>
      </Box>
      <ModalWrapper />
      <SpinnerComponent />
    </>
  );
};

export default MainContainer;
