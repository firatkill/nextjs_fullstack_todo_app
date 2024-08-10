import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useGlobalStore } from "@/zustand/globalStore";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",

  bgcolor: "background.paper",
  border: "2px solid ",
  borderColor: "background.default",
  boxShadow: 24,
  borderRadius: "16px",
  p: 4,
};
export default function ModalContainer({ children }) {
  const open =
    useGlobalStore((state) => state.activeModal) == null ? false : true;

  const handleClose = useGlobalStore((state) => state.handleActiveModal);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => {
        handleClose(null);
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
}
