"use client";
import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";
import { drawerWidth } from "@/globalVariables";
import { useGlobalStore } from "@/zustand/globalStore";

export default function SidebarContainer({ children }) {
  const mobileOpen = useGlobalStore((state) => state.sidebarOptions.mobileOpen);
  const handleDrawerClose = useGlobalStore((state) => state.handleDrawerClose);

  const handleDrawerTransitionEnd = useGlobalStore(
    (state) => state.handleDrawerTransitionEnd
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={() => handleDrawerTransitionEnd()}
        onClose={() => handleDrawerClose()}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { md: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {children}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { md: "block", xs: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {children}
      </Drawer>
    </Box>
  );
}
