import React from "react";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Container from "@mui/material/Container";
import dayjs from "dayjs";

function TimeRangePicker({ 
  initialStartTime, 
  initialEndTime, 
  onStartTimeChange, 
  onEndTimeChange 
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2, mb: 2 }}>
        <TimePicker
          label="Start time"
          ampm={false}
          value={initialStartTime ? dayjs(initialStartTime) : dayjs().hour(12).minute(0)}
          onChange={(newValue) => {
            const selectedDate = newValue?.toDate();
            if (selectedDate) {
              const startTime = selectedDate.getHours() * 100 + selectedDate.getMinutes();
              console.log(startTime)
              onStartTimeChange(startTime);
            }
          }}
        />
        <TimePicker
          label="End time"
          ampm={false}
          value={initialEndTime ? dayjs(initialEndTime) : dayjs().hour(13).minute(0)}
          minTime={initialStartTime ? dayjs(initialStartTime) : dayjs().hour(0).minute(0)}
          onChange={(newValue) => {
            const selectedDate = newValue?.toDate();
            if (selectedDate) {
              const endTime = selectedDate.getHours() * 100 + selectedDate.getMinutes();
              onEndTimeChange(endTime);
            }
          }}
        />
      </Container>
    </LocalizationProvider>
  );
}

export default TimeRangePicker;