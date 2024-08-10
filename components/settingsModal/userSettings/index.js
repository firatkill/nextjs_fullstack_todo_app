import { Key, PersonPin } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";
import ChangeName from "./changeName";
import ChangePassword from "./changePassword";

export default function UserSettings() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",

        margin: 0,

        typography: "body1",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ marginTop: "1rem", borderColor: "divider" }}>
          <TabList centered onChange={handleChange}>
            <Tab icon={<PersonPin />} aria-label="personpin" value="1" />
            <Tab icon={<Key />} aria-label="pass" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ChangeName />
        </TabPanel>
        <TabPanel value="2">
          <ChangePassword />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
