import { putAPI } from "@/services/fetchAPI";
import { useGlobalStore } from "@/zustand/globalStore";
import { useUserStore } from "@/zustand/userStore";
import { Button, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ChangeName() {
  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const [name, setName] = useState(currentUser.name);
  const { data: session, update } = useSession();
  const openSnackbar = useGlobalStore((state) => state.openSnackbar);
  const setLoading = useGlobalStore((state) => state.handleLoading);
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const req = putAPI(`/auth/changeUserName`, name);
    req
      .then((res) => {
        if (res.success) {
          update({ name });
          setCurrentUser(res.user);
          // SNACKBAR res.message
          openSnackbar({ severity: "success", text: res.message });
        } else {
          // SNACKBAR res.error
          openSnackbar({ severity: "error", text: res.error });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      <TextField
        error={name.length < 3}
        helperText={name.length < 3 && "Name must be at least 3 characters"}
        label="Name"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
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
        Update User name
      </Button>
    </form>
  );
}
