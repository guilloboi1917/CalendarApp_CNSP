import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { prevMonth, nextMonth } from "../../redux/actions/DateActions"
import { menuClick } from '../../redux/actions/CalendarActions';

import { MONTH } from "../utlis";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// (menuIcon) CRUD Calendar    Current Month  < > (Logout Icon)
export default function NavBar(props) {

  const date = useSelector(state => state.date);
  const calendar = useSelector(state => state.calendar);
  const dispatch = useDispatch();

  const logout = () => {
    props.logout();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "transparent", boxShadow: "none"}}>
        <Toolbar>
          <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2, color: "#5f6368" }} onClick={() => dispatch(menuClick(calendar))}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: .1, color: "#5f6368"}}>
            CRUD Calendar 
          </Typography>
          <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 1, color: "#5f6368" }} onClick={ () => dispatch(prevMonth(date)) }>
            <NavigateBeforeIcon/>
          </IconButton>
          <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2, color: "#5f6368" }} onClick={ () => dispatch(nextMonth(date)) }> 
            <NavigateNextIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#5f6368"}}>
            {MONTH[date.month-1] } {date.year}
          </Typography>
          <Button style={{color: "#5f6368"}} onClick={logout}> Logout </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

