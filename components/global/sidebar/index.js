"use client";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import {
  AddCircleOutline,
  KeyboardDoubleArrowRight,
  Logout,
  ManageAccounts,
} from "@mui/icons-material";
import { useGlobalStore } from "@/zustand/globalStore";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { getAPI } from "@/services/fetchAPI";
import { useCategoryStore } from "@/zustand/categoryStore";
import { signOut } from "next-auth/react";
import CategoryListItem from "@/components/categoryListItem";

export default function SidebarComponent() {
  const todoCategories = useCategoryStore((state) => state.todoCategories);
  const setTodoCategories = useCategoryStore(
    (state) => state.setTodoCategories
  );
  const changeCategoryHandler = useGlobalStore(
    (state) => state.changeCurrentCategory
  );
  const setModal = useGlobalStore((state) => state.handleActiveModal);
  const setLoading = useGlobalStore((state) => state.handleLoading);
  const openSnackbar = useGlobalStore((state) => state.openSnackbar);

  useEffect(() => {
    setLoading(true);
    const categoriesData = getAPI("/categories/getAllCategories");
    categoriesData
      .then((res) => {
        if (res.success) {
          setTodoCategories(res.categories);
        } else {
          // SNACKBAR res.error
          openSnackbar({ severity: "error", text: res.error });
        }
      })
      .catch((er) => console.error("Hata Oluştu: " + er))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="h-3/4">
      <Toolbar sx={{ height: 75 }} className="align-center justify-center">
        <Image
          onClick={() => {
            changeCategoryHandler(null);
          }}
          style={{ cursor: "pointer", width: "auto" }}
          height={100}
          width={200}
          src="/logo.svg"
          alt="logo"
          priority
        />
      </Toolbar>
      <Divider />
      <Toolbar className="flex justify-between items-center">
        <Typography variant="h6">Categories</Typography>

        <Button
          type="button"
          onClick={() => {
            setModal("addCategory");
          }}
          variant="contained"
          sx={{
            color: "button.addText",
            backgroundColor: "button.add",
            "&:hover": {
              backgroundColor: "button.addText",
              color: "button.add",
            },
          }}
        >
          <AddCircleOutline />
        </Button>
      </Toolbar>
      <Typography ml={1} variant="caption" display="block" gutterBottom>
        Right click for options..
      </Typography>
      <List sx={{ height: "50%", overflowY: "scroll" }}>
        <ListItem
          onClick={() => changeCategoryHandler(null)}
          sx={{
            marginTop: "-1rem",
            "&:hover": {
              transition: "transform .15s ease-out",
              transform: "translateX(5%)",
            },
          }}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <KeyboardDoubleArrowRight />
            </ListItemIcon>
            <ListItemText primary={"All"} />
          </ListItemButton>
        </ListItem>
        {todoCategories.length > 0 &&
          todoCategories.map((category) => (
            <CategoryListItem
              onClicked={() => changeCategoryHandler(category)}
              key={category.id}
              category={category}
            />
          ))}
      </List>
      <Divider />
      <List>
        <ListItem
          onClick={(e) => {
            setModal("settings");
          }}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <ManageAccounts />
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => {
            signOut({ redirect: "true", callbackUrl: "/auth/login" });
          }}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={"Log out"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}
