import { postAPI } from "@/services/fetchAPI";
import { useCategoryStore } from "@/zustand/categoryStore";
import { useGlobalStore } from "@/zustand/globalStore";
import { Button, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";

export default function AddCategoryModal() {
  const [categoryName, setCategoryName] = useState("");
  const setLoading = useGlobalStore((state) => state.handleLoading);
  const setModal = useGlobalStore((state) => state.handleActiveModal);
  const addTodoCategory = useCategoryStore((state) => state.addTodoCategory);
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const req = postAPI(`/categories/postCategory`, { categoryName });
    req
      .then((res) => {
        setLoading(false);
        addTodoCategory(res.category.category);
        setModal(null);
      })
      .catch((er) => console.error("Hata oluştu: " + er));
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
          color: "white",
          marginTop: "1rem",
          background: green[800],
          "&:hover": {
            background: "white",
            color: green[800],
          },
        }}
      >
        Add Category
      </Button>
    </form>
  );
}
