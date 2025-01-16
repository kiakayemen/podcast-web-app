import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Timeline = ({content}) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <div className="sm:w-screen max-w-screen-lg">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                variant=""
                centered
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab className="text-white" label="Summary" value="1" />
                <Tab className="text-white" label="Transcript" value="2" />
                <Tab className="text-white" label="Refrences" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">{content}</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
};

export default Timeline;
