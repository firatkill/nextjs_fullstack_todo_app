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
import { useGlobalStore } from "@/zustand/globalStore";

import { getAPI, postAPI } from "@/services/fetchAPI";
import { useCategoryStore } from "@/zustand/categoryStore";
import { useTodoStore } from "@/zustand/todoStore";
import { useUserStore } from "@/zustand/userStore";

export default function AddTodoModal() {
  const todoCategories = useCategoryStore((state) => state.todoCategories);
  const setTodoCategories = useCategoryStore(
    (state) => state.setTodoCategories
  );
  const currentUser = useUserStore((state) => state.currentUser);
  const addTodo = useTodoStore((state) => state.addTodo);
  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const currentCategory = useGlobalStore((state) => state.currentTodoCategory);
  const [todoCategoryId, setTodoCategoryId] = useState(
    currentCategory != null ? currentCategory.id : ""
  );
  const [date, setDate] = useState(dayjs());
  const [todoColor, setTodoColor] = useState();
  const setModal = useGlobalStore((state) => state.handleActiveModal);
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
    const todoToAdd = {
      todoName,
      todoDescription,
      date,
      todoColor,
      todoCategoryId,
      userId: currentUser.id,
    };

    //Post todotoAdd

    setLoading(true);
    const req = postAPI(`/todos/postTodo`, todoToAdd);
    req
      .then((res) => {
        setLoading(false);

        addTodo(res.todo.todo);
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
      .catch((er) => {
        console.error("Hata Oluştu: " + er);
        setLoading(false);
      });
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
              setDate(newValue.toDate().toISOString());
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
            background: green[800],
            "&:hover": {
              background: "white",
              color: green[800],
            },
          }}
        >
          Add Todo
        </Button>
      </form>
    </>
  );
}
