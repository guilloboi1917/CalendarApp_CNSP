import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createTask } from "../../../redux/actions/TaskActions";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Container } from "@mui/material";

export default function NewTask(props) {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));

  const [taskData, setTaskData] = useState({
    creator: user.result._id,
    title: "",
    description: "",
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Container sx={{ display: "flex", flexDirection: "row" }} components={['TimePicker', 'TimePicker']}>
            <TimePicker
              label="Start time"
              ampm={false}
              value={dayjs(new Date(taskData.date.year, taskData.date.month, taskData.date.day, 12, 0))}
              onChange={(e) => {
                const selectedDate = e['$d'];

                // Calculate end time 
                const startTime = selectedDate.getHours() * 100 + selectedDate.getMinutes();

                // Update state with new date and endtime
                setTaskData({
                  ...taskData,
                  date: {
                    ...taskData.date,
                    startTime: startTime
                  }
                });
              }} />
            <TimePicker
              label="End time"
              ampm={false}
              value={dayjs(new Date(taskData.date.year, taskData.date.month, taskData.date.day, 12, 0))}
              minTime={taskData.date.startTime ? dayjs(new Date(taskData.date.year, taskData.date.month, taskData.date.day, taskData.date.startTime / 100, taskData.date.startTime % 100)) : dayjs(new Date(taskData.date.year, taskData.date.month, taskData.date.day, 0, 0))}
              onChange={(e) => {
                // Assuming e.target.value is a Date object
                const selectedDate = e['$d'];

                // Calculate end time hoursandMinutes
                const endTime = selectedDate.getHours() * 100 + selectedDate.getMinutes();

                // Update state with new date and endtime
                setTaskData({
                  ...taskData,
                  date: {
                    ...taskData.date,
                    endTime: endTime
                  }
                });
              }} />          </Container>
        </LocalizationProvider>

        {/* <TextField 
            fullWidth={true} 
            autoComplete="off" 
            id="task-shared" 
            label="Shared" 
            multiline rows={4} 
            variant="filled" 
            value={taskData.shared} 
            onChange={(e) => setTaskData({...taskData, shared: e.target.value})} 
          /> */}
      </Box>
      <DialogActions>
        <Button onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </TabPanel>
  )
}