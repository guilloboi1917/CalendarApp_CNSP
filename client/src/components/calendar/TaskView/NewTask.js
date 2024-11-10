import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createTask } from "../../../redux/actions/TaskActions";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import ColorPicker from "../../ColorPicker";
import TimeRangePicker from "../../TimeRangePicker";


export default function NewTask(props) {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));



  const [taskData, setTaskData] = useState({
    creator: user.result._id,
    title: "",
    description: "",
    color: "#711DB0", // default color
    startTime: 1200,
    endTime: 1300,
    complete: false,
    date: props.date,
    shared: ""
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (taskData.title.length > 0) {
      e.preventDefault();
      dispatch(createTask(taskData))
      props.close();
    }
  }

  const handleStartTimeChange = (newStartTime) => {
    setTaskData((prev) => ({
      ...prev,
      date: { ...prev.date, startTime: newStartTime },
    }));
  };

  const handleEndTimeChange = (newEndTime) => {
    setTaskData((prev) => ({
      ...prev,
      date: { ...prev.date, endTime: newEndTime },
    }));
  };

  return (
    <TabPanel value={props.value}>
      <Box component="form" noValidate autoComplete="off" sx={{ '& .MuiTextField-root': { m: 1 }, }}>
        <TextField
          required
          fullWidth={true}
          autoComplete="off"
          id="task-title"
          label="Add Task Title"
          variant="filled"
          value={taskData.title}
          inputProps={{ maxLength: 25 }}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        />
        <TextField
          fullWidth={true}
          autoComplete="off"
          id="task-description"
          label="Description"
          multiline rows={4}
          variant="filled"
          value={taskData.description}
          onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
        />

        <TimeRangePicker
          initialStartTime={new Date(taskData.date.year, taskData.date.month - 1, taskData.date.day, Math.floor(taskData.date.startTime / 100), taskData.date.startTime % 100)}
          initialEndTime={new Date(taskData.date.year, taskData.date.month - 1, taskData.date.day, Math.floor(taskData.date.endTime / 100), taskData.date.endTime % 100)}
          onStartTimeChange={handleStartTimeChange}
          onEndTimeChange={handleEndTimeChange}
        />
        <Typography>
          Event Color
        </Typography>
        {/* Reusable ColorPicker below TextField */}
        <Box sx={{ mt: 2 }}>
          <ColorPicker
            selectedColor={taskData.color}
            onColorSelect={(color) => setTaskData({ ...taskData, color })}
          />
        </Box>
      </Box>
      <DialogActions>
        <Button onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </TabPanel>
  )
}