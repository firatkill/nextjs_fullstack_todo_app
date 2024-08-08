import { create } from "zustand";

const useCategoryStore = create((set, get) => ({
  todoCategories: [],

  setTodoCategories: (todoCategories) => {
    set((state) => ({
      ...state,
      todoCategories: todoCategories,
    }));
  },
  addTodoCategory: (category) => {
    set((state) => ({
      ...state,
      todoCategories: [...state.todoCategories, category],
    }));
  },
  deleteTodoCategory: (categoryId) => {
    const newCategs = get().todoCategories.filter(
      (category) => category.id != categoryId
    );

    set((state) => ({
      ...state,
      todoCategories: newCategs,
    }));
  },
  updateTodoCategory: (categoryToUpdate) => {
    const updatedCategs = [...get().todoCategories];
    const index = updatedCategs.findIndex(
      (category) => category.id === categoryToUpdate.id
    );
    updatedCategs[index] = categoryToUpdate;

    set((state) => ({
      ...state,
      todoCategories: updatedCategs,
    }));
  },
}));

export { useCategoryStore };
