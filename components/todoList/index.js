"use client";
import TodoListItem from "../todoListItem";
import { useEffect } from "react";
import { useGlobalStore } from "@/zustand/globalStore";
import { getAPI } from "@/services/fetchAPI";
import { useTodoStore } from "@/zustand/todoStore";

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);
  const currentCategory = useGlobalStore((state) => state.currentTodoCategory);

  const setLoading = useGlobalStore((state) => state.handleLoading);
  useEffect(() => {
    setLoading(true);
    const todosData = getAPI("/todos/getAllTodos");
    todosData
      .then((res) => {
        setTodos(res);

        setLoading(false);
      })
      .catch((er) => {
        console.error("Hata Oluştu: " + er);
        setLoading(false);
      });
  }, []);

  const currentTodos =
    currentCategory == null
      ? todos
      : todos.filter((todo) => todo.todoCategoryId == currentCategory.id);

  return (
    <ul>
      {currentTodos.length > 0 &&
        currentTodos.map((todo) => <TodoListItem key={todo.id} todo={todo} />)}
    </ul>
  );
}
