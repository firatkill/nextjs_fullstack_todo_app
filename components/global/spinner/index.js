"use client";
import { useGlobalStore } from "@/zustand/globalStore";
import { Backdrop, CircularProgress } from "@mui/material";

export default function SpinnerComponent(props) {
  const loading = useGlobalStore((state) => state.loading);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading || props.loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
