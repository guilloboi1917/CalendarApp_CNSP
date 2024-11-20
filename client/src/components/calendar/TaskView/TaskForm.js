import React, { useState, useEffect } from "react";

import { useSelector} from "react-redux";
import { getMonth, getDayTask } from "../../utlis";

import NewTask from "./NewTask";
import TaskCardContainer from "./TaskCardContainer";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Typography from "@mui/material/Typography";
import Toolbar from '@mui/material/Toolbar';

export default function TaskForm(props){
//create new UI to show tasks for that day and update/delete them
  const tasks = useSelector((state) => state.task);
  const todayTask = getDayTask(props.date, tasks)

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //add settimeout to fix bug where it switches when closed
  useEffect(() => {
    if (!props.open){
      setValue("1")
    }
  }, [props.open])

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={props.open}
      onClose={props.close}
      sx={{flexWrap: "nowrap"}}
    >
      <DialogTitle> 
        <AppBar position="static" style={{ background: "transparent", boxShadow: "none"}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#5f6368"}}>
              {getMonth(props.date.month-1)} {props.date.day}, {props.date.year} 
            </Typography>
            <IconButton size="large" edge="end" aria-label="menu" sx={{ color: "#5f6368" }} onClick={props.close}>
                <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%', typography: 'body1', height: 500}}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="Task Form tabs">
                <Tab label="Add Task" value="1" />
                <Tab label="View/Edit Tasks" value="2" />
              </TabList>
            </Box>
            <NewTask value={"1"} date={props.date} close={props.close}/>
            <TaskCardContainer value={"2"} tasks={todayTask} />
          </TabContext>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
