import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { updateTask, deleteTask } from "../../../redux/actions/TaskActions";

import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TimeRangePicker from "../../TimeRangePicker";
import ColorPicker from "../../ColorPicker";

export default function TaskCard(props) {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const [taskData, setTaskData] = useState({
    creator: props.task.creator,//user.result._id,
    title: props.task.title,
    description: props.task.description,
    color: props.task.color,
    startTime: props.task.startTime,
    endTime: props.task.endTime,
    complete: props.task.complete,
    date: props.task.date,
    sharedWith: props.task.sharedWith //!#
  });

  const [showFull, setShowFull] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setShowFull(true)
  }

  const handleClose = () => {
    setShowFull(false);
    setShowEdit(false);
    setTaskData({
      creator: props.task.creator,//user.result._id,
      title: props.task.title,
      description: props.task.description,
      color: props.task.color,
      startTime: props.task.startTime,
      endTime: props.task.endTime,
      complete: props.task.complete,
      date: props.task.date,
      sharedWith: props.task.sharedWith
    })
  }

  const handleEditOpen = () => {
    if (showEdit) {
      setShowEdit(false);
      setTaskData({
        creator: props.task.creator,//user.result._id,
        title: props.task.title,
        description: props.task.description,
        color: props.task.color,
        startTime: props.task.startTime,
        endTime: props.task.endTime,
        complete: props.task.complete,
        date: props.task.date,
        sharedWith: props.task.sharedWith
      })
    } else {
      setShowEdit(true);
    }
  }

  const handleComplete = () => {
    if (taskData.complete) {
      dispatch(updateTask(props.task._id, { ...taskData, complete: false }));
      setTaskData({
        creator: props.task.creator,//user.result._id,
        title: props.task.title,
        description: props.task.description,
        color: props.task.color,
        startTime: props.task.startTime,
        endTime: props.task.endTime,
        complete: false,
        date: props.task.date,
        sharedWith: props.task.sharedWith
      })
    }
    else {
      dispatch(updateTask(props.task._id, { ...taskData, complete: true }));
      setTaskData({
        creator: props.task.creator,//user.result._id,
        title: props.task.title,
        description: props.task.description,
        color: props.task.color,
        startTime: props.task.startTime,
        endTime: props.task.endTime,
        complete: true,
        date: props.task.date,
        sharedWith: props.task.sharedWith
      })
    }
  }

  const handleUpdateSave = () => {
    // if (props.task.title !== taskData.title || props.task.description !== taskData.description || props.task.sharedWith !== taskData.sharedWith) {
    //   dispatch(updateTask(props.task._id, taskData));
    // }
    if (props.task !== taskData) {
      dispatch(updateTask(props.task._id, taskData));
    }
    setShowFull(false);
    setShowEdit(false);
  }

  const handleDelete = () => {
    dispatch(deleteTask(props.task._id));
    setShowFull(false);
    setShowEdit(false);
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
    <Box sx={{ marginBottom: 1, marginTop: 1 }}>
      {!showFull ?
        <Box display="flex" flexDirection="row">
          {/* <Checkbox checked={taskData.complete} onChange={handleComplete} /> */}
          <Button fullWidth variant="contained" sx={{
            justifyContent: "flex-start",
            backgroundColor: taskData.color ? taskData.color : "lightblue",
            "&:hover": {
              backgroundColor: taskData.color ? taskData.color : "lightblue", // Keep the color same on hover
              transform: "translateY(-2px)",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            },
            transition: "transform 0.2s ease, box-shadow 0.2s ease", // Smooth transition
          }} onClick={handleOpen}>
            <Typography> {taskData.title}</Typography>
          </Button>
        </Box>
        :
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="relative" style={{ background: "transparent", boxShadow: "none" }}>
            <Toolbar variant="dense">
              {!showEdit ?
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: "black" }}>
                  {taskData.title}
                </Typography> :
                <TextField size="large" autoComplete="off" id="task-title" label="Title" variant="standard" value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} sx={{ flexGrow: 1 }} />
              }
              <IconButton size="small" edge="start" aria-label="menu" sx={{ mr: 1, color: "#5f6368" }} onClick={handleEditOpen}>
                <EditIcon />
              </IconButton>
              <IconButton size="small" edge="start" aria-label="menu" sx={{ mr: 1, color: "#5f6368" }} onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
              <IconButton size="small" edge="start" aria-label="menu" sx={{ mr: 1, color: "#5f6368" }} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
            <Toolbar>
              {!showEdit ?
                <Typography component="div" noWrap={false} sx={{ flexGrow: 1, color: "black" }}> {taskData.description}</Typography> :
                <Box>< TextField size="large" fullWidth= {true} autoComplete="off" id="task-description" label="Description" multiline rows={2} variant="standard" value={taskData.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} sx={{ mt: 1, mb: 1, flexGrow: 1 }} />
                  <TimeRangePicker sx={{ mt: 2 }}
                    initialStartTime={new Date(taskData.date.year, taskData.date.month - 1, taskData.date.day, Math.floor(taskData.date.startTime / 100), taskData.date.startTime % 100)}
                    initialEndTime={new Date(taskData.date.year, taskData.date.month - 1, taskData.date.day, Math.floor(taskData.date.endTime / 100), taskData.date.endTime % 100)}
                    onStartTimeChange={handleStartTimeChange} onEndTimeChange={handleEndTimeChange} />
                  <Typography sx={{ color: "black", mt: 2, mb: 2 }}>Event Color</Typography>
                  <ColorPicker
                    sx={{ m: 2 }}
                    selectedColor={taskData.color}
                    onColorSelect={(color) => setTaskData({ ...taskData, color })}
                  />
                </Box>
              }
            </Toolbar>



            {showEdit ? <Button onClick={handleUpdateSave}> Save</Button> : ""}
          </AppBar>
        </Box>
      }
    </Box>
  )
}
