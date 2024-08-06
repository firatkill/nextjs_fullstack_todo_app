import { create } from "zustand";

const useTodoStore = create((set, get) => ({
  currentTodo: null,
  todos: [],
  changeCurrentTodo: (todo) => {
    set((state) => ({
      ...state,
      currentTodo: todo,
    }));
  },
  setTodos: (todos) => {
    set((state) => ({
      ...state,
      todos: todos,
    }));
  },
  addTodo: (todo) => {
    set((state) => ({
      ...state,
      todos: [...state.todos, todo],
    }));
  },
  deleteTodo: (todoId) => {
    const newTodos = get().todos.filter((todo) => todo.id != todoId);
    set((state) => ({
      ...state,
      todos: newTodos,
    }));
  },
  deleteTodosByCategory: (categoryId) => {
    const newTodos = get().todos.filter(
      (todo) => todo.todoCategoryId != categoryId
    );
    set((state) => ({
      ...state,
      todos: newTodos,
    }));
  },
  clearTodos: (category) => {
    let newTodos = [];
    if (category == "All") {
      newTodos = get().todos.filter((todo) => todo.completed == false);
    } else {
      newTodos = get().todos.filter(
        (todo) =>
          todo.completed == false ||
          (todo.todoCategoryId != category && todo.completed == true)
      );
    }
    set((state) => ({
      ...state,
      todos: newTodos,
    }));
  },
  updateTodo: (todoToUpdate) => {
    const updatedTodos = [...get().todos];
    const index = updatedTodos.findIndex((todo) => todo.id === todoToUpdate.id);
    updatedTodos[index] = todoToUpdate;
    set((state) => ({
      ...state,
      todos: updatedTodos,
    }));
  },
}));

export { useTodoStore };
