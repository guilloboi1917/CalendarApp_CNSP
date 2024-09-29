import React from "react";
import { useSelector } from "react-redux";
import { getDaysArray, isToday, WEEKDATE } from "../../utlis";

import Menu from "../Menu/Menu";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CalendarCell from "./CalendarCell";

export default function Calendar(){
  const cal = useSelector(state => state.calendar);
  const date = useSelector(state => state.date);
  const calendar = getDaysArray(date.month, date.year);
  const today = new Date();
  const todayObject = {
    day: today.getDate(),
    month: today.getMonth()+1,
    year: today.getFullYear(),
  }

  const showWeekDate = () => {
    return(
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)">
      {
        WEEKDATE.map((val, index) => (
        <Box key={val+index} gridColumn="span 1" sx={{flex: 1, borderLeft: "#dadce0 1px solid"}}>
          <Typography>
            {val}
          </Typography>
        </Box>
      ))
      }    
      </Box>
    )
  }
  const showCalendar = () => {
    return(
      calendar.map((row, rowIndex) => (
        <Box key={rowIndex}  display="grid" gridTemplateColumns="repeat(7, 1fr)" sx={{ borderBottom: "#dadce0 1px solid" }}>
          {row.map((day, dayIndex) => (
            <CalendarCell key={day.month+dayIndex} day={day} today={isToday(todayObject, day)}/>
          ))}
        </Box>
      ))
    )
  }

  return(
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" sx={{textAlign: "center", borderTop: "#dadce0 1px solid"}}>

      {cal.menuIsOpen ? <Menu /> : ""}

      <Box gridColumn={cal.menuIsOpen ? "span 9" : "span 12"}>
        <Box sx={{ width: 1 }}>
          {showWeekDate()}
        </Box>
        <Box sx={{ width: 1 }}>
          {showCalendar()}
        </Box>
      </Box>
    </Box>
  )
}
