import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose(); // Close the menu after navigation
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div" style={{ flexGrow: 1 }}>
          My Cinema
        </Typography>
        {/* Botón adicional para ir a la página de inicio */}
        <Button color="inherit" onClick={() => handleNavigation('/')}>
          Home
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleNavigation('/movies')}>Movies</MenuItem>
          <MenuItem onClick={() => handleNavigation('/cinema-Rooms')}>Cinema Rooms</MenuItem>
          <MenuItem onClick={() => handleNavigation('/projection-Schedule')}>Projection Schedules</MenuItem>
          {/* Add more menu items as needed */}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
