"use client";
import { Delete, DoneAll, Edit } from "@mui/icons-material";
import { Box, ListItem, Typography } from "@mui/material";
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
  const openSnackbar = useGlobalStore((state) => state.openSnackbar);
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
        if (res.success) {
          updateTodo(res.todo);
          // SNACKBAR res.message
        } else {
          //  SNACKBAR res.error
          openSnackbar({ severity: "error", text: res.error });
        }
      })
      .catch((er) => console.error("Hata oluştu: " + er))
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteHandler = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      setLoading(true);
      const req = deleteAPI(`/todos/deleteTodo?id=${props.todo.id}`);
      req
        .then((res) => {
          if (res.success) {
            deleteTodo(props.todo.id);
            // SNACKBAR res.message
            openSnackbar({ severity: "success", text: res.message });
          } else {
            // SNACKBAR res.error
            openSnackbar({ severity: "error", text: res.error });
          }
        })
        .catch((er) => console.error("Hata oluştu: " + er))
        .finally(() => setLoading(false));
    }
  };

  return (
    <ListItem
      sx={{
        boxShadow: 3,
        backgroundColor: "todoColor.listItem",
        width: { xs: "99% ", md: "95%" },
        alignSelf: "center",
        justifySelf: "center",

        backgroundColor: `todoColor.${todo.todoColor}`,
      }}
      iscompleted={todo.completed ? "true" : "false"}
      className={styles.todoListItem}
    >
      <Box
        sx={{
          overflow: "hidden",

          borderRight: 2,
          width: "95% !important",
          maxWidth: "95%",
          position: "relative",
        }}
        className={styles.leftPartition}
      >
        <Box
          sx={{ border: 2, alignSelf: "flex-start" }}
          onClick={todoCompletedHandler}
          iscompleted={todo.completed ? "true" : "false"}
          className={styles.completedIconSpan}
        >
          <DoneAll className={styles.completedIcon} />
        </Box>
        <Box
          sx={{ width: "100%", overflow: "hidden" }}
          className={styles.todoInfo}
        >
          <Typography
            sx={{ maxWidth: "100%", textOverflow: "hidden" }}
            title={todo.todoName}
          >
            {todo.todoName}
          </Typography>
          <Typography
            sx={{ maxWidth: "100%", textOverflow: "hidden" }}
            title={todo.todoDescription}
          >
            {todo.todoDescription}
          </Typography>
          <Typography
            sx={{
              alignSelf: "flex-end",
              paddingRight: "1rem",
            }}
          >
            {`${todoDate.toDateString()} ${todoDate.getHours()}:${
              todoDate.getMinutes() < 10
                ? "0" + todoDate.getMinutes()
                : todoDate.getMinutes()
            }`}
          </Typography>
        </Box>
      </Box>

      <Box sx={{}} className={styles.rightPartition}>
        <Box>
          <Box className={styles.icons}>
            <Edit
              sx={{
                "&:hover": {
                  backgroundColor: "button.edit",
                  color: "button.editText",
                },
              }}
              onClick={openModal}
              className={`${styles.icon} ${styles.editIcon}`}
            />

            <Delete
              sx={{
                "&:hover": {
                  backgroundColor: "button.delete",
                  color: "button.deleteText",
                },
              }}
              onClick={deleteHandler}
              className={`${styles.icon} ${styles.deleteIcon}`}
            />
          </Box>
        </Box>
      </Box>
    </ListItem>
  );
}
