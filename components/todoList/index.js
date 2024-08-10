"use client";
import TodoListItem from "../todoListItem";
import { useEffect } from "react";
import { useGlobalStore } from "@/zustand/globalStore";
import { getAPI } from "@/services/fetchAPI";
import { useTodoStore } from "@/zustand/todoStore";
import { useSession } from "next-auth/react";
import { List } from "@mui/material";

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);
  const currentCategory = useGlobalStore((state) => state.currentTodoCategory);
  const session = useSession();
  const setLoading = useGlobalStore((state) => state.handleLoading);
  const openSnackbar = useGlobalStore((state) => state.openSnackbar);
  useEffect(() => {
    setLoading(true);

    const todosData = getAPI("/todos/getAllTodos");
    todosData
      .then((res) => {
        if (res.success) {
          setTodos(res.todos);
        } else {
          // SNACKBAR res.error
          openSnackbar({ severity: "error", text: res.error });
        }
      })
      .catch((er) => {
        console.error("Hata Oluştu: " + er);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const currentTodos =
    currentCategory == null
      ? todos
      : todos.filter((todo) => todo.todoCategoryId == currentCategory.id);

  return (
    <List
      sx={{
        overflowY: "scroll",
        height: "100%",
        //todo height kadar padding bırakıyoruz
        pb: "100px",
      }}
    >
      {currentTodos.length > 0 &&
        currentTodos.map((todo) => <TodoListItem key={todo.id} todo={todo} />)}
    </List>
  );
}
