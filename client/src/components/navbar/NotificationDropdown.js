import React from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import Typography from '@mui/material';
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
    notifications.map((n) => n.read = true)
    user.sharedNotifications = notifications
    dispatch(updateUser(user))
    setAnchorEl(null);
  };

  const nothingNew = notifications.length === 0

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
          overflowY: 'auto', // Enable vertical scroll if content overflows
        }}
      >
        {/* Map over notifications and render MenuItems */}
        {!nothingNew && notifications?.slice(0, 5).map((notification, index) => (
          <MenuItem key={index} onClick={handleClose} sx={{ backgroundColor: notification.read ? "lightgrey" : "white" }}>
            <ListItemText primary={notification.content} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default NotificationDropdown;