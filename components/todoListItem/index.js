"use client";
import { Delete, DoneAll, Edit } from "@mui/icons-material";
import { Typography } from "@mui/material";
import styles from "./index.module.css";
import { useGlobalStore } from "@/zustand/globalStore";
import { useTodoStore } from "@/zustand/todoStore";
import { deleteAPI, putAPI } from "@/services/fetchAPI";
export default function TodoListItem(props) {
  const todo = props.todo;
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const handleEditModal = useGlobalStore((state) => state.handleActiveModal);
  const setCurrentTodo = useTodoStore((state) => state.changeCurrentTodo);
  const setLoading = useGlobalStore((state) => state.handleLoading);
  const todoDate = new Date(todo.date);
  const openModal = () => {
    setCurrentTodo(todo);
    handleEditModal("editTodo");
  };
  const todoCompletedHandler = () => {
    //update todo's completed property, settimeout for 3 seconds to prevent unnecessary updates
    setLoading(true);
    const todoToUpdate = { ...todo, completed: !todo.completed };
    const req = putAPI(`/todos/updateTodo`, todoToUpdate);
    req
      .then((res) => {
        updateTodo(todoToUpdate);

        setLoading(false);
      })
      .catch((er) => console.error("Hata oluştu: " + er));
  };

  const deleteHandler = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      const req = deleteAPI(`/todos/deleteTodo?id=${props.todo.id}`);
      req
        .then((res) => deleteTodo(props.todo.id))
        .catch((er) => console.error("Hata oluştu: " + er));
    }
  };

  return (
    <li
      iscompleted={todo.completed ? "true" : "false"}
      className={styles.todoListItem}
    >
      <div className={styles.leftPartition}>
        <span
          onClick={todoCompletedHandler}
          iscompleted={todo.completed ? "true" : "false"}
          className={styles.completedIconSpan}
        >
          <DoneAll className={styles.completedIcon} />
        </span>
        <div className={styles.todoInfo}>
          <p>{todo.todoName}</p>
          <p>{todo.todoDescription}</p>
        </div>
      </div>
      <div className={styles.rightPartition}>
        <Typography
          sx={{ background: todo.todoColor }}
          className={styles.dateText}
        >
          {`${todoDate.toDateString()} ${todoDate.getHours()}:${
            todoDate.getMinutes() < 10
              ? "0" + todoDate.getMinutes()
              : todoDate.getMinutes()
          }`}
        </Typography>
        <div>
          <div className={styles.icons}>
            <Edit
              onClick={openModal}
              className={`${styles.icon} ${styles.editIcon}`}
            />

            <Delete
              onClick={deleteHandler}
              className={`${styles.icon} ${styles.deleteIcon}`}
            />
          </div>
        </div>
      </div>
    </li>
  );
}
