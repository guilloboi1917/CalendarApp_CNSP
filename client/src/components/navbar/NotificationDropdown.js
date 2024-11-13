import React from 'react';
import { Button, Menu, MenuItem, ListItemText } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { updateUser } from '../../redux/actions/UserActions';
import { useDispatch } from "react-redux";


const NotificationDropdown = ({ user, notifications }) => {
  // State to control the anchor element for the Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  // Open the Menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the Menu
  const handleClose = () => {
    // Set all notifications to read
    // notifications.map((n) => n.read = true)
    // user.sharedNotifications = notifications
    // dispatch(updateUser(user))
    setAnchorEl(null);
  };

  const nothingNew = notifications?.length === 0

  // notifications = [
  //   { "read": false, "who": "testemail", "content": "OldesttestContent" },
  //   { "read": true, "who": "testemail", "content": "testContent" },
  //   { "read": true, "who": "testemail", "content": "testContent" },
  //   { "read": true, "who": "testemail", "content": "testContent" },
  //   { "read": true, "who": "testemail", "content": "testContent" },
  //   { "read": true, "who": "testemail", "content": "testContent" },
  //   { "read": true, "who": "testemail", "content": "testContent" },
  //   { "read": true, "who": "testemail", "content": "noah.isaak@hotmail.com has shared task Weihnachten with you!" },
  //   { "read": true, "who": "testemail", "content": "NewesttestContent" }]

  return (
    <div>
      {/* Button that triggers the Menu */}
      <Button onClick={handleClick} variant="contained" color="primary">
        Notifications
        <Notifications sx={{ ml: 1 }} />
      </Button>


      {/* Menu that opens when the button is clicked */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          maxHeight: 320,  // Set a max height for the scrollable area
          overflowY: 'hidden', // Enable vertical scroll if content overflows,
        }}
      >
        {/* Map over notifications and render MenuItems */}
        {notifications?.reverse().slice(0,5).map((notification, index) => (
          <MenuItem key={index} onClick={handleClose} sx={{maxWidth: "700px", borderBottom: "1px solid black", backgroundColor: notification.read ? "white" : "white" }}>
            <ListItemText primary={notification.content}/>
          </MenuItem>
        ))}
      </Menu>
    </div >
  );
};

export default NotificationDropdown;