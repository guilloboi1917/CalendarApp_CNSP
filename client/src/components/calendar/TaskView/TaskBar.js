import React from "react";
import { useSelector } from "react-redux";

import { getDayTask } from "../../utlis";

import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import CropSquareIcon from '@mui/icons-material/CropSquare';

export default function TaskBar(props){
  const tasks = useSelector((state) => state.task);
  const todayTask = getDayTask(props.date, tasks);
  const completedTask = todayTask.filter(task => task.complete === true);

  return(
    <Box display="flex" justifyContent="flex-end" flexDirection="column" sx={{flexGrow: 1}}>
        {todayTask.length > 0 ? 
          <Box display="flex" justifyContent="flex-start" flexDirection="row">
            <CropSquareIcon sx={{ color: "#86DC3D" }}/>
            <Typography sx={{color: "#86DC3D"}}>{completedTask.length} </Typography>
            <CropSquareIcon sx={{ color: "#FF0000" }}/>
            <Typography sx={{color: "#FF0000"}}>{todayTask.length-completedTask.length} </Typography>
          </Box>
          : ""
        }
    </Box>  
  )
}