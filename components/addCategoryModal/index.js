import { postAPI } from "@/services/fetchAPI";
import { useCategoryStore } from "@/zustand/categoryStore";
import { useGlobalStore } from "@/zustand/globalStore";
import { useUserStore } from "@/zustand/userStore";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function AddCategoryModal() {
  const [categoryName, setCategoryName] = useState("");
  const setLoading = useGlobalStore((state) => state.handleLoading);
  const setModal = useGlobalStore((state) => state.handleActiveModal);
  const addTodoCategory = useCategoryStore((state) => state.addTodoCategory);
  const currentUser = useUserStore((state) => state.currentUser);
  const openSnackbar = useGlobalStore((state) => state.openSnackbar);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const req = postAPI(`/categories/postCategory`, {
      categoryName,
      userId: currentUser.id,
    });
    req
      .then((res) => {
        if (res.success) {
          addTodoCategory(res.category);
          openSnackbar({ severity: "success", text: res.message });
        } else {
          // SNACKBAR res.error
          openSnackbar({ severity: "error", text: res.error });
        }
      })
      .catch((er) => console.error("Hata oluştu: " + er))
      .finally(() => {
        setLoading(false);
        setModal(null);
      });
  };
  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      <TextField
        error={categoryName.length < 3}
        helperText={
          categoryName.length < 3 && "Name must be at least 3 characters"
        }
        label="Category Name"
        value={categoryName}
        onChange={(e) => {
          setCategoryName(e.currentTarget.value);
        }}
        required
        sx={{ marginBottom: "1rem" }}
        minLength={3}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          marginTop: "1rem",
          color: "button.addText",

          backgroundColor: "button.add",
          "&:hover": {
            backgroundColor: "button.addText",
            color: "button.add",
          },
        }}
      >
        Add Category
      </Button>
    </form>
  );
}
