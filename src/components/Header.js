import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{display:'flex',justifyContent:'center'}}>
          <Stack spacing={2} direction={'row'}>
          <Link to={'/'}>Home</Link>
          <Link>About</Link>
          <Link>Contact</Link>
          <Link to={'/login'}>Logout</Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>    
  );
};

export default Header;
