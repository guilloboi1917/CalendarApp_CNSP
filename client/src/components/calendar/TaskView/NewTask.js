import React, { useState} from "react";
import { useDispatch } from "react-redux";

import { createTask } from "../../../redux/actions/TaskActions";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';

export default function NewTask(props){
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));

  const [taskData, setTaskData] = useState({
    creator: user.result._id,
    title:"",
    description: "",
    complete: false,
    date: props.date,
    shared: ""
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (taskData.title.length > 0){
      e.preventDefault();
      dispatch(createTask(taskData))
      props.close();
    }
  }

  return(
    <TabPanel value={props.value}>
        <Box component="form" noValidate autoComplete="off" sx={{'& .MuiTextField-root': { m: 1}, }}>
          <TextField 
            required 
            fullWidth={true} 
            autoComplete="off" 
            id="task-title" 
            label="Add Task Title" 
            variant="filled" 
            value={taskData.title} 
            inputProps={{ maxLength: 25 }}
            onChange={(e) => setTaskData({...taskData, title: e.target.value})}
          />
          <TextField 
            fullWidth={true} 
            autoComplete="off" 
            id="task-description" 
            label="Description" 
            multiline rows={4} 
            variant="filled" 
            value={taskData.description} 
            onChange={(e) => setTaskData({...taskData, description: e.target.value})} 
          />
          <TextField 
            fullWidth={true} 
            autoComplete="off" 
            id="task-shared" 
            label="Shared" 
            multiline rows={4} 
            variant="filled" 
            value={taskData.shared} 
            onChange={(e) => setTaskData({...taskData, shared: e.target.value})} 
          />
        </Box>
        <DialogActions>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions> 
    </TabPanel>
  )
}