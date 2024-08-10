import { deleteAPI } from "@/services/fetchAPI";
import { useCategoryStore } from "@/zustand/categoryStore";
import { useGlobalStore } from "@/zustand/globalStore";
import { useTodoStore } from "@/zustand/todoStore";
import { Delete, Edit, KeyboardDoubleArrowRight } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

export default function CategoryListItem(props) {
  const [menuAnchorElement, setMenuAnchorElement] = useState(null);
  const setModal = useGlobalStore((state) => state.handleActiveModal);
  const setLoading = useGlobalStore((state) => state.handleLoading);
  const deleteTodoCategory = useCategoryStore(
    (state) => state.deleteTodoCategory
  );
  const changeCurrentCategory = useGlobalStore(
    (state) => state.changeCurrentCategory
  );
  const deleteTodosByCategory = useTodoStore(
    (state) => state.deleteTodosByCategory
  );

  const onRightClick = (event) => {
    event.preventDefault();
    props.onClicked();
    setMenuAnchorElement(event.currentTarget);
  };
  const closeMenu = () => {
    setMenuAnchorElement(null);
  };
  const deleteHandler = (e) => {
    e.preventDefault();

    if (
      confirm(
        "Are you sure you want to delete this category? You will lose all your todos of this category. This can't be undone."
      )
    ) {
      setLoading(true);
      const req = deleteAPI(
        `/categories/deleteCategory?id=${props.category.id}`
      );
      req
        .then((res) => {
          if (res.success) {
            deleteTodoCategory(props.category.id);
            deleteTodosByCategory(props.category.id);
            changeCurrentCategory(null);
          }
        })
        .catch((er) => console.error("Hata oluştu: " + er))
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <ListItem
      onContextMenu={onRightClick}
      onClick={props.onClicked}
      sx={{
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
        <ListItemText primary={props.category.categoryName} />
      </ListItemButton>
      <Menu
        sx={{}}
        open={Boolean(menuAnchorElement)}
        onClose={closeMenu}
        anchorEl={menuAnchorElement}
      >
        <MenuItem
          sx={{
            "&:hover": {
              backgroundColor: "button.edit",
              color: "button.editText",
            },
          }}
          onClick={() => {
            setModal("editCategory");
            closeMenu();
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            deleteHandler(e);
            closeMenu(e);
          }}
          sx={{
            "&:hover": {
              backgroundColor: "button.delete",
              color: "button.deleteText",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </ListItem>
  );
}
