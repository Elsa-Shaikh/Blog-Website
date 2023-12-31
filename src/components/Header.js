import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { DataContext } from "../context/DataProvider";

const Header = () => {
const {accountData} = useContext(DataContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
let navigate =useNavigate();

const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <AppBar position="static" sx={{backgroundColor:'black',marginBottom:'10px'}}>
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
   <Stack spacing={2} direction={'row'}>
               <ArticleIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Blogging
            </Typography>

   </Stack>
        <Stack spacing={2} direction={'row'}>
          <Link to={'/'} style={{color:'white',fontSize:'20px',textDecoration:'none'}}>Home</Link>
          <Link style={{color:'white',fontSize:'20px',textDecoration:'none'}}>About</Link>
          <Link style={{color:'white',fontSize:'20px',textDecoration:'none'}}>Contact</Link>
          <Link to={'/login'} style={{color:'white',fontSize:'20px',textDecoration:'none'}}>Logout</Link>
          </Stack>
<Stack direction={"row"} spacing={1}>
                    <Tooltip title="Profile">
                      <IconButton sx={{ p: 0 }} color="info">
                        <Avatar sx={{bgcolor:'rgb(2,136,209)'}}>
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Stack direction={"column"}>
                      <Typography
                        sx={{ color: "white", fontSize: "12px", pt: "3px" }}
                      >
                        Username 
                                             </Typography>
                      <Typography sx={{ color: "white", fontSize: "12px" }}>
                         Name                      </Typography>
                    </Stack>
                  </Stack>
        </Toolbar>
      </AppBar> */}

<AppBar position="sticky" sx={{ bgcolor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ArticleIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Bloging
            </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate('/') 
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate('/about')
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">About</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">Contact</Typography>
                  </MenuItem>

                </Menu>
              </Box>
            <ArticleIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Blogging
            </Typography>
              <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",

                  justifyContent: "center",
                },
              }}
            >
              <Button
                onClick={() => {
  navigate('/')
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
              <Button
                onClick={() => {
                  navigate('/about')
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                About
              </Button>

              <Button
                onClick={() => {
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Contact
              </Button>

            </Box>
                <Box sx={{ flexGrow: 0, p: 1 }}>
                  <Stack direction={"row"} spacing={1}>
                    <Tooltip title="Profile">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="secondary">
                        <Avatar sx={{bgcolor:'rgb(200,36,9)'}}>
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Stack direction={"column"}>
                      <Typography
                        sx={{ color: "white", fontSize: "12px", pt: "3px" }}
                      >
                        Username: {accountData.username}
                      </Typography>
                      <Typography sx={{ color: "white", fontSize: "12px" }}>
                        Name: {accountData.name}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate('/login');
                        handleCloseUserMenu();
                      }}
                    >
                      <LogoutIcon color="warning" sx={{ cursor: "pointer" }} />
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
          </Toolbar>
        </Container>
      </AppBar>

    </Box>    
  );
};

export default Header;
