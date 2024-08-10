import { deleteAPI } from "@/services/fetchAPI";
import { useGlobalStore } from "@/zustand/globalStore";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function DeepPreferences() {
  const setLoading = useGlobalStore((state) => state.handleLoading);
  const openSnackbar = useGlobalStore((state) => state.openSnackbar);

  const deleteAllDataHandler = (e) => {
    e.preventDefault();

    if (
      confirm(
        "Are you sure? this process will wipe out all your Todos and Categories data. This action cannot be undone."
      )
    ) {
      setLoading(true);
      const req = deleteAPI(`/user/deleteAllData`);
      req
        .then((res) => {
          console.log(res);
          if (res.success) {
            location.reload();
          } else {
            // TODO: snackbar
            openSnackbar({ severity: "error", text: res.error });
          }
        })
        .catch((er) => console.error("Hata oluştu: " + er))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const deleteAccountHandler = (e) => {
    e.preventDefault();
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      setLoading(true);
      const req = deleteAPI(`/user/deleteAccount`);
      req
        .then((res) => {
          if (res.success) {
            signOut();
            location.reload();
          } else {
            // TODO: snackbar
            openSnackbar({ severity: "error", text: res.error });
          }
        })
        .catch((er) => console.error("Hata oluştu: " + er))
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <>
      {" "}
      <Button
        variant="contained"
        onClick={deleteAllDataHandler}
        sx={{
          width: "100%",
          marginTop: "1rem",
          color: "button.deleteText",

          backgroundColor: "button.delete",
          "&:hover": {
            backgroundColor: "button.deleteText",
            color: "button.delete",
          },
        }}
      >
        WIPE OUT All DATA
      </Button>
      <Button
        onClick={deleteAccountHandler}
        variant="contained"
        sx={{
          width: "100%",
          marginTop: "2rem",
          color: "button.deleteText",

          backgroundColor: "button.delete",
          "&:hover": {
            backgroundColor: "button.deleteText",
            color: "button.delete",
          },
        }}
      >
        DELETE ACCOUNT
      </Button>
    </>
  );
}
