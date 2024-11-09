import React, { useState } from "react";
import TaskForm from "../TaskView/TaskForm";
import TaskBar from "../TaskView/TaskBar";

import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

export default function CalendarCell(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(props.dayTasks.sort((t1, t2) => parseInt(t1.date.startTime) -parseInt(t2.date.startTime)))

  return (
    <Box container>
      <Box gridColumn="span 1" display="flex" flexDirection="column" height="15vh" maxHeight="15vh" sx={{ borderLeft: "#dadce0 1px solid" }} onClick={handleOpen}>
        <Typography sx={props.today ? { color: "#000fff", border: 1, textShadow: "0 0 1px #00bfff, 0 0 1px black" } : {}}>
          {props.day.day}
        </Typography>
        <Box sx={{ p: 0.5, overflowY: "auto" }}>
          {props.dayTasks &&
            props.dayTasks.sort((t1, t2) => t1.date.startTime > t2.date.startTime).map((t) => (
              <Box component="section" sx={{ p: 0, marginTop: 1, background: 'lightblue' }}>
                {t.title}
              </Box>
            ),)}
        </Box>
        {/* <TaskBar date={props.day} /> */}
      </Box>
      <TaskForm date={props.day} open={open} close={handleClose} />
    </Box>
  )
}
