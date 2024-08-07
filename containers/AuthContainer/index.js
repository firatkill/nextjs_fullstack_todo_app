import { Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,

  backgroundColor: "white",

  boxShadow: "0px 5px 10px 5px rgba(0,0,0,.5)",
  borderRadius: "16px",
  padding: "3rem 2rem",
};
export default function AuthContainer({ children }) {
  return <Box style={style}>{children}</Box>;
}
