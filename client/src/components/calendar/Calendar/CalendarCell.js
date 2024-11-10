import React, { useState } from "react";
import TaskForm from "../TaskView/TaskForm";
import TaskBar from "../TaskView/TaskBar";

import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import { styled } from "@mui/system";


export default function CalendarCell(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const CustomScrollbarBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0.5),
    overflowY: "auto",
    maxHeight: "300px", // Adjust based on your layout needs
    "&::-webkit-scrollbar": {
      width: "4px", // Set the width of the scrollbar
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent", // Background of the scrollbar track
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888", // Scrollbar thumb color
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#aaa", // Color when hovered
    },
  }));

  // console.log(props.dayTasks.sort((t1, t2) => parseInt(t1.date.startTime) -parseInt(t2.date.startTime)))

  return (
    <Box container>
      <Box gridColumn="span 1" display="flex" flexDirection="column" height="15vh" maxHeight="15vh" sx={{ borderLeft: "#dadce0 1px solid" }} onClick={handleOpen}>
        <Typography sx={props.today ? { color: "#000fff", border: 1, textShadow: "0 0 1px #00bfff, 0 0 1px black" } : {}}>
          {props.day.day}
        </Typography>
        <CustomScrollbarBox >
          {props.dayTasks &&
            props.dayTasks.sort((t1, t2) => t1.date.startTime > t2.date.startTime).map((t) => (
              <Box component="section" sx={{ p: 0, marginTop: 1, background: t.color, borderRadius: "12px" }}>
                {t.title}
              </Box>
            ),)}
        </CustomScrollbarBox>
        {/* <TaskBar date={props.day} /> */}
      </Box>
      <TaskForm date={props.day} open={open} close={handleClose} />
    </Box>
  )
}
