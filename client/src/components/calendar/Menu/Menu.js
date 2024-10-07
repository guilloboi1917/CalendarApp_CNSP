import React from "react";

import Checkbox from '@mui/material/Checkbox';

import { useSelector, useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../../../redux/actions/TaskActions";
import { getMonth } from "../../utlis";

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Menu(){
  const date = useSelector(state => state.date);
  const tasks = useSelector(state => state.task);
  const dispatch = useDispatch();

  const getMonthTask = () => {
    let task =  tasks.filter(task => task.date.month === date.month && task.date.year === date.year);
    task.sort((a,b) => a.date.day - b.date.day);
    return task
  }

  const monthTask = getMonthTask();

  const getTaskDays = () => {
    let days = [];
    for (let i = 0; i < monthTask.length; i++){
      if (!days.includes(monthTask[i].date.day) ){
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
          <Typography variant="h5" sx={{marginLeft: 1, textAlign:"left", color: "black"}}>{getMonth(date.month-1)} {day} </Typography>
          {
            monthTask.filter((t => t.date.day === day)).map((task, index) => (
              <Box key={index} display="flex" flexDirection="row">
                <Checkbox 
                  checked={task.complete} 
                  onChange={() => task.complete ? 
                    dispatch(updateTask(task._id, {...task, complete: false} )) : 
                    dispatch(updateTask(task._id, {...task, complete: true} ))} 
                />
                <Typography variant="h6" component="div" align="center" sx={{ m: 1, textAlign:"left", flexGrow: 1, color: "black"}}> {task.title}</Typography> 
                <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 1, color: "#5f6368" }} onClick={() => dispatch(deleteTask(task._id))}>
                  <DeleteIcon id={task._id}/>
                </IconButton>
                <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 1, color: "#5f6368" }} onClick={() => console.log("shared")}>
                  <ShareIcon id={task._id}/>
                </IconButton>
              </Box>
            ))
          } 
        </Box>
      ))  
    )
  }

  return(
    <Box gridColumn="span 3" sx={{borderBottom: "#dadce0 1px solid"}}>
      {monthTask.length > 0 ? 
        showAllTask() : 
        <Typography variant="h5" sx={{marginLeft: 1, textAlign:"left", color: "black"}}>No tasks this month</Typography>}
    </Box>
  )
}