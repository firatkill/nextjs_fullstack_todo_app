import { styled, useTheme } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { ColorModeContext } from "@/containers/themeProviderContainer";
import { useContext, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { useUserStore } from "@/zustand/userStore";
import { putAPI } from "@/services/fetchAPI";
import { useGlobalStore } from "@/zustand/globalStore";

export default function UserPreferences() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const userPreferences = useUserStore((state) => state.userPreferences);
  const setUserPreferences = useUserStore((state) => state.setUserPreferences);
  const setLoading = useGlobalStore((state) => state.handleLoading);
  const setModal = useGlobalStore((state) => state.handleActiveModal);
  const openSnackbar = useGlobalStore((state) => state.openSnackbar);
  const [isColorModeLight, setIsColorModeLight] = useState(
    theme.palette.mode == "light"
  );
  const [isSystemDefaults, setIsSystemDefaults] = useState(
    userPreferences.themeSystemDefaults
  );

  const submitHandler = (e) => {
    e.preventDefault();
    const preferences = {
      theme: isColorModeLight ? "light" : "dark",
      themeSystemDefaults: isSystemDefaults,
    };
    colorMode.toggleColorMode(isColorModeLight ? "light" : "dark");

    const req = putAPI(`/userPreferences/updateUserPreferences`, {
      ...userPreferences,
      ...preferences,
    });
    req
      .then((res) => {
        if (res.success) {
          setUserPreferences(res.userPreferences);
          // SNACKBAR res.message
          openSnackbar({ severity: "success", text: res.message });
        } else {
          // SNACKBAR res.error
          openSnackbar({ severity: "error", text: res.error });
        }
      })
      .catch((er) => {
        console.error("Hata oluştu: " + er);
      })
      .finally(() => {
        setLoading(false);
        setModal(null);
      });
  };
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 78,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(0px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(45px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,

          backgroundColor: !isColorModeLight ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: !isColorModeLight ? "#003892" : "#001e3c",
      width: 32,
      height: 32,

      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,

      backgroundColor: !isColorModeLight ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  return (
    <form onSubmit={submitHandler}>
      <FormControl sx={{ width: "400px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormLabel sx={{ borderBottom: 1, width: "fit-content" }}>
            Theme{" "}
          </FormLabel>

          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              checked={isSystemDefaults}
              onChange={() => {
                setIsSystemDefaults(!isSystemDefaults);
              }}
              control={<Checkbox />}
              label="Use System Defaults"
            />

            <FormControlLabel
              disabled={isSystemDefaults}
              labelPlacement="right"
              control={
                <MaterialUISwitch
                  checked={!isColorModeLight}
                  onChange={() => {
                    setIsColorModeLight(!isColorModeLight);
                  }}
                  sx={{ m: 1 }}
                />
              }
              label={isColorModeLight ? "Light" : "Dark"}
            />
          </FormGroup>
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            color: "button.editText",
            mt: 3,
            backgroundColor: "button.edit",
            "&:hover": {
              backgroundColor: "button.editText",
              color: "button.edit",
            },
          }}
        >
          Update Preferences
        </Button>
      </FormControl>
    </form>
  );
}
