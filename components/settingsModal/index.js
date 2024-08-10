import { Box, Tab } from "@mui/material";
import UserPreferences from "./userPreferences";
import * as React from "react";

import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";
import UserSettings from "./userSettings";
export default function SettingsModal() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList centered onChange={handleChange}>
            <Tab label="Preferences" value="1" />
            <Tab label="User Settings" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <UserPreferences />
        </TabPanel>
        <TabPanel sx={{ padding: 0 }} value="2">
          <UserSettings />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
