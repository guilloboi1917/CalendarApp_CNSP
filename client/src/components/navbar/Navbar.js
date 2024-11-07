import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { prevMonth, nextMonth } from "../../redux/actions/DateActions"
import { menuClick } from '../../redux/actions/CalendarActions';

import { MONTH } from "../utlis";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BasicMenu from './NavbarMenu';


// (menuIcon) CRUD Calendar    Current Month  < > Profile Menu (Logout Icon)
export default function NavBar(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const date = useSelector(state => state.date);
  const calendar = useSelector(state => state.calendar);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")))
  }, [])

  const logout = () => {
    props.logout();
  }

  const handleAccountClick = () => {
    props.handleAccountClick();
  }

  return (
    <Box sx={{ flexGrow: 1, background: "lightblue"}}>
      <AppBar position="static" style={{ background: "transparent", boxShadow: "none" }}>
        <Toolbar>
          <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2, color: "#5f6368" }} onClick={() => dispatch(menuClick(calendar))}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: .1, color: "#5f6368" }}>
            CNSP Calendar
          </Typography>
          <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 1, color: "#5f6368" }} onClick={() => dispatch(prevMonth(date))}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2, color: "#5f6368" }} onClick={() => dispatch(nextMonth(date))}>
            <NavigateNextIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#5f6368" }}>
            {MONTH[date.month - 1]} {date.year}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 2, color: "#5f6368" }}>
            {`${user.result.name}`}
          </Typography>
          <BasicMenu
            logout={() => logout()}
            handleAccountClick={() => handleAccountClick()}
          ></BasicMenu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

