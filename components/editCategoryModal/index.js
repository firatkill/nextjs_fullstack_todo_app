import { putAPI } from "@/services/fetchAPI";
import { useCategoryStore } from "@/zustand/categoryStore";
import { useGlobalStore } from "@/zustand/globalStore";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function EditCategoryModal() {
  const setLoading = useGlobalStore((state) => state.handleLoading);
  const setModal = useGlobalStore((state) => state.handleActiveModal);
  const updateTodoCategory = useCategoryStore(
    (state) => state.updateTodoCategory
  );
  const changeCurrentCategory = useGlobalStore(
    (state) => state.changeCurrentCategory
  );
  const currentTodoCategory = useGlobalStore(
    (state) => state.currentTodoCategory
  );
  const [categoryName, setCategoryName] = useState(
    currentTodoCategory.categoryName
  );

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const req = putAPI(`/categories/updateCategory`, {
      ...currentTodoCategory,
      categoryName,
    });
    req
      .then((res) => {
        if (res.success) {
          updateTodoCategory(res.category);
          changeCurrentCategory(res.category);
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
          color: "button.editText",

          backgroundColor: "button.edit",
          "&:hover": {
            backgroundColor: "button.editText",
            color: "button.edit",
          },
        }}
      >
        Update Category
      </Button>
    </form>
  );
}
