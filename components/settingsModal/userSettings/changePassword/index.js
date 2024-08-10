import { putAPI } from "@/services/fetchAPI";
import { useGlobalStore } from "@/zustand/globalStore";
import { useUserStore } from "@/zustand/userStore";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function ChangePassword() {
  const currentUser = useUserStore((state) => state.currentUser);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setLoading = useGlobalStore((state) => state.handleLoading);
  const openSnackbar = useGlobalStore((state) => state.openSnackbar);
  const submitHandler = (e) => {
    e.preventDefault();
    if (confirmPassword == newPassword) {
      setLoading(true);
      const req = putAPI(`/auth/changePassword`, {
        oldPassword,
        newPassword,
      });
      req
        .then((res) => {
          if (res.success) {
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
    } else {
      openSnackbar({ severity: "warning", text: "Şifreler Eşleşmiyor." });
    }
  };
  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      <TextField
        error={oldPassword.length < 5}
        helperText={
          oldPassword.length < 5 && "Password must be at least 5 characters"
        }
        label="Old Password"
        type="password"
        value={oldPassword}
        onChange={(e) => {
          setOldPassword(e.currentTarget.value);
        }}
        required
        sx={{ marginBottom: "1rem" }}
        minLength={3}
      />
      <TextField
        error={newPassword.length < 5}
        helperText={
          newPassword.length < 5 && "Passowrd must be at least 5 characters"
        }
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.currentTarget.value);
        }}
        required
        sx={{ marginBottom: "1rem" }}
        minLength={3}
      />
      <TextField
        error={confirmPassword != newPassword}
        helperText={
          confirmPassword != newPassword && "Passwords Doesn't Match."
        }
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.currentTarget.value);
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
        Update Password
      </Button>
    </form>
  );
}
