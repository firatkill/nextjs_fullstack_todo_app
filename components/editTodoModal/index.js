import { useGlobalStore } from "@/zustand/globalStore";
import { useTodoStore } from "@/zustand/todoStore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { blue, green, orange, pink, red } from "@mui/material/colors";
import { getAPI, putAPI } from "@/services/fetchAPI";
import { useCategoryStore } from "@/zustand/categoryStore";

export default function EditTodoModal() {
  const currentTodo = useTodoStore((state) => state.currentTodo);
  const setModal = useGlobalStore((state) => state.handleActiveModal);
  const todoCategories = useCategoryStore((state) => state.todoCategories);
  const setTodoCategories = useCategoryStore(
    (state) => state.setTodoCategories
  );
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const [todoName, setTodoName] = useState(currentTodo.todoName);
  const [todoDescription, setTodoDescription] = useState(
    currentTodo.todoDescription
  );
  const [todoCategoryId, setTodoCategoryId] = useState(
    currentTodo.todoCategoryId
  );
  const [date, setDate] = useState(currentTodo.date);
  const [todoColor, setTodoColor] = useState(currentTodo.todoColor);
  const setLoading = useGlobalStore((state) => state.handleLoading);

  const radioChangeHandler = (e) => {
    setTodoColor(e.target.value);
  };
  const controlProps = (item) => ({
    checked: todoColor == item,
    onChange: radioChangeHandler,
    value: item,
    name: "color-picker",
    inputProps: { "aria-label": item },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const todoToUpdate = {
      ...currentTodo,
      todoName,
      todoDescription,
      date,
      todoColor,
      todoCategoryId,
    };
    setLoading(true);

    const req = putAPI(`/todos/updateTodo`, todoToUpdate);
    req
      .then((res) => {
        setLoading(false);
        updateTodo(todoToUpdate);
        setModal(null);
      })
      .catch((er) => console.error("Hata oluştu: " + er));
  };

  useEffect(() => {
    setLoading(true);
    const categoriesData = getAPI("/categories/getAllCategories");
    categoriesData
      .then((res) => {
        setTodoCategories(res);
        setLoading(false);
      })
      .catch((er) => console.error("Hata Oluştu: " + er));
  }, []);

  return (
    <>
      <form className="flex flex-col" onSubmit={submitHandler}>
        <TextField
          error={todoName.length < 3}
          helperText={
            todoName.length < 3 && "Name must be at least 3 characters"
          }
          label="Todo Name"
          value={todoName}
          onChange={(e) => {
            setTodoName(e.currentTarget.value);
          }}
          required
          sx={{ marginBottom: "1rem" }}
          minLength={3}
        />
        <TextField
          error={todoDescription.length < 3}
          helperText={
            todoDescription.length < 3 &&
            "Description must be at least 3 characters"
          }
          label="Todo Description"
          value={todoDescription}
          onChange={(e) => {
            setTodoDescription(e.currentTarget.value);
          }}
          sx={{ marginBottom: "1rem" }}
          required
          minLength={3}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            onChange={(newValue) => {
              setDate(newValue.toDate().toLocaleString());
            }}
            defaultValue={dayjs(new Date(date))}
            disablePast
            label="Date*"
          />
        </LocalizationProvider>

        <FormControl required sx={{ marginTop: "1rem", width: "100%" }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={todoCategoryId}
            label="Category"
            onChange={(e) => {
              setTodoCategoryId(e.target.value);
            }}
          >
            {todoCategories.length > 0 &&
              todoCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.categoryName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <div className="flex flex-col mt-3 items-center justify-center">
          <Typography>Pick a color</Typography>

          <div>
            <Radio
              {...controlProps("green")}
              sx={{
                color: green[800],

                "&.Mui-checked": {
                  color: green[800],
                },
              }}
            />
            <Radio
              {...controlProps("red")}
              sx={{
                color: red[800],

                "&.Mui-checked": {
                  color: red[800],
                },
              }}
            />
            <Radio
              {...controlProps("blue")}
              sx={{
                color: blue[800],

                "&.Mui-checked": {
                  color: blue[800],
                },
              }}
            />
            <Radio
              {...controlProps("orange")}
              sx={{
                color: orange[800],

                "&.Mui-checked": {
                  color: orange[800],
                },
              }}
            />
            <Radio
              {...controlProps("pink")}
              sx={{
                color: pink[800],

                "&.Mui-checked": {
                  color: pink[800],
                },
              }}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          sx={{
            color: "white",
            marginTop: "1rem",

            "&:hover": {},
          }}
        >
          Update
        </Button>
      </form>
    </>
  );
}
