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

export default function TaskCard(props) {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const [taskData, setTaskData] = useState({
    creator: user.result._id,
    title: props.task.title,
    description: props.task.description,
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
      creator: user.result._id,
      title: props.task.title,
      description: props.task.description,
      complete: props.task.complete,
      date: props.task.date,
      sharedWith: props.task.sharedWith
    })
  }

  const handleEditOpen = () => {
    if (showEdit) {
      setShowEdit(false);
      setTaskData({
        creator: user.result._id,
        title: props.task.title,
        description: props.task.description,
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
        creator: user.result._id,
        title: props.task.title,
        description: props.task.description,
        complete: false,
        date: props.task.date,
        sharedWith: props.task.sharedWith
      })
    }
    else {
      dispatch(updateTask(props.task._id, { ...taskData, complete: true }));
      setTaskData({
        creator: user.result._id,
        title: props.task.title,
        description: props.task.description,
        complete: true,
        date: props.task.date,
        sharedWith: props.task.sharedWith
      })
    }
  }

  const handleUpdateSave = () => {
    if (props.task.title !== taskData.title || props.task.description !== taskData.description || props.task.sharedWith !== taskData.sharedWith) {
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

  return (
    <Box sx={{ marginBottom: 1 }}>
      {!showFull ?
        <Box display="flex" flexDirection="row">
          <Checkbox checked={taskData.complete} onChange={handleComplete} />
          <Button fullWidth variant="contained" sx={{ justifyContent: "flex-start" }} onClick={handleOpen}>
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
                <TextField size="small" autoComplete="off" id="task-description" label="Description" multiline rows={2} variant="standard" value={taskData.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} sx={{ mt: 1, mb: 1, flexGrow: 1 }} />
              }
            </Toolbar>
            <Toolbar>
              {!showEdit ?
                <Typography component="div" noWrap={false} sx={{ flexGrow: 1, color: "black" }}> {taskData.sharedWith.join(',')}</Typography> 
                :
                <TextField size="small" autoComplete="off" id="task-sharedWith" label="Shared With (use comma to separate emails)" multiline rows={2} variant="standard" value={taskData.sharedWith} onChange={(e) => setTaskData({ ...taskData, sharedWith: e.target.value.split(',') })} sx={{ mt: 1, mb: 1, flexGrow: 1 }} />
              }
            </Toolbar>

            {showEdit ? <Button onClick={handleUpdateSave}> Save</Button> : ""}
          </AppBar>
        </Box>
      }
    </Box>
  )
}
