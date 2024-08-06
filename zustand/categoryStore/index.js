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
    const filteredCategs = get().todoCategories.filter(
      (category) => category.id != categoryToUpdate.id
    );
    set((state) => ({
      ...state,
      todoCategories: [...filteredCategs, categoryToUpdate],
    }));
  },
}));

export { useCategoryStore };
