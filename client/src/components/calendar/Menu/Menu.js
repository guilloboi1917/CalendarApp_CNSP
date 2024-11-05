import React, { useState } from "react";

import Checkbox from '@mui/material/Checkbox';

import { useSelector, useDispatch } from "react-redux";
import { updateTask, deleteTask, shareTask, unshareTask } from "../../../redux/actions/TaskActions";
import { getMonth } from "../../utlis";

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemText } from "@mui/material";

export default function Menu() {
  const date = useSelector(state => state.date);
  const tasks = useSelector(state => state.task);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const handleOpenModal = (taskId) => {
    setCurrentTaskId(taskId);  // Set the current task id
    setOpen(true);  // Open the modal
  };

  const handleCloseModal = () => {
    setOpen(false);  // Close the modal
    setEmail("");  // Clear the email field
    setCurrentTaskId(null);
  };

  // To share task with email
  const handleShare = (remove) => {
    console.log(`Sharing Task ${currentTaskId} with email: ${email}`);
    const emailData = { "email": email }
    dispatch(shareTask(currentTaskId, emailData))
    handleCloseModal();
  };

  
  // To share task with email
  const handleUnshare = (e) => {
    console.log(`Unsharing Task ${currentTaskId} with email: ${e}`);
    const emailData = { "email": e }
    dispatch(unshareTask(currentTaskId, emailData))
  };

  //handle email validation
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);const handleValidation = (e) => {
      //set value to user input
      setValue(e.target.value);
      
      //define regex     
      const reg = /(?:[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*|”(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*”)@(?:(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–9-]*[a-z0–9])?|\[(?:(?:(2(5[0–5]|[0–4][0–9])|1[0–9][0–9]|[1–9]?[0–9]))\.){3}(?:(2(5[0–5]|[0–4][0–9])|1[0–9][0–9]|[1–9]?[0–9])|[a-z0–9-]*[a-z0–9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      
      //test whether input is valid
      setValid(reg.test(e.target.value));
  };
  
  const getMonthTask = () => {
    let task = tasks.filter(task => task.date.month === date.month && task.date.year === date.year);
    task.sort((a, b) => a.date.day - b.date.day);
    return task
  }

  const monthTask = getMonthTask();

  const getTaskDays = () => {
    let days = [];
    for (let i = 0; i < monthTask.length; i++) {
      if (!days.includes(monthTask[i].date.day)) {
        days.push(monthTask[i].date.day)
      }
    }
    return days;
  }

  const taskDays = getTaskDays();

  const showAllTask = () => {
    return (
      taskDays.map((day, index) => (
        <Box display="flex" justifyContent="flex-start" flexDirection="column" key={day + index} >
          <Typography variant="h5" sx={{ marginLeft: 1, textAlign: "left", color: "black" }}>{getMonth(date.month - 1)} {day} </Typography>
          {
            monthTask.filter((t => t.date.day === day)).map((task, index) => (
              <Box key={index} display="flex" flexDirection="row">
                <Checkbox
                  checked={task.complete}
                  onChange={() => task.complete ?
                    dispatch(updateTask(task._id, { ...task, complete: false })) :
                    dispatch(updateTask(task._id, { ...task, complete: true }))}
                />
                <Typography variant="h6" component="div" align="center" sx={{ m: 1, textAlign: "left", flexGrow: 1, color: "black" }}> {task.title}</Typography>
                <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 1, color: "#5f6368" }} onClick={() => dispatch(deleteTask(task._id))}>
                  <DeleteIcon id={task._id} />
                </IconButton>
                <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 1, color: "#5f6368" }} onClick={() => handleOpenModal(task._id)}>
                  <ShareIcon id={task._id} />
                </IconButton>
              </Box>
            ))
          }
        </Box>
      ))
    )
  }

  return (
    <Box gridColumn="span 3" sx={{ borderBottom: "#dadce0 1px solid" }}>
      {monthTask.length > 0 ? showAllTask() : (
        <Typography variant="h5" sx={{ marginLeft: 1, textAlign: "left", color: "black" }}>
          No tasks this month
        </Typography>
      )}

      {/* Modal for Sharing Task */}
      <Modal open={open} onClose={handleCloseModal} aria-labelledby="share-task-modal" aria-describedby="share-task-modal-description">
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
        }}>
          <Typography id="share-task-modal" variant="h6" component="h2">
            Share Task
          </Typography>
          <List dense={true}>
            {currentTaskId ? tasks.find(task => task._id === currentTaskId)["sharedWith"].map((e) =>
            (
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleUnshare(e)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary= {e}
                />
              </ListItem>
            ),)
              : ""}
          </List>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={email}
            //onChange={(e) => setEmail(e.target.value)}
            onChange={(e) => {
              setEmail(e.target.value);
              //check email format
              handleValidation(e);
              }
            }
            error={!valid}
            sx={{ mt: 2, mb: 2 }}
            type="email"
            placeholder="email to share with"
          />
          <Button variant="contained" color="primary" onClick={handleShare}>
            Share
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}