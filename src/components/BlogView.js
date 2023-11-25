import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, styled } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../Utils/handleApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataContext } from "../context/DataProvider";
import CompDialog from "../DialogBox/CompDialog";


const Container = styled(Box)(({theme})=>({
  margin:'50px 100px',
  [theme.breakpoints.down('md')]:{
    margin:0
  }
}))


const BlogView = () => {
  const navigate = useNavigate();
   const { accountData } = useContext(DataContext);
   const { id } = useParams();
   const [blog, setBlog] = useState({});

  const fetchData = async () => {
    let response = await API.getPostById(id);
        if (response.isSuccess) {
      setBlog(response?.data.post);
    }
  };


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
 
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const handleDelete = async()=>{
  try{
  let response = await API.deletePost(blog._id);
   if(response.isSuccess){
    navigate('/');
    console.log("Deleted!");
   }}
   catch(error){
    console.log("Failed to Delete!",error);
   }
}


   return (
    <>
      <Container
        // sx={{
        //   margin: "50px 100px",
        // }}
      >
<Chip 
label={`Category: ${blog?.categories}`} 
variant="filled" 
color="success" 
sx={{
  fontSize: {
    xs: '16px', // Font size for extra-small screens
    sm: '18px', // Font size for small screens
    md: '20px', // Font size for medium screens
    lg: '24px', // Font size for large screens
  },
  padding:{
    xs: '10px', 
    sm: '10px', 
    md: '20px', 
    lg: '24px'
  },
  boxSizing:'border-box',
  position:'relative',
  top:'31px'
}}
  />
        <img
          src={`http://localhost:5000/uploads/${blog?.picture}`}
          alt="BlogImage"
          style={{
            borderRadius:'20px',
            width: "100%",
            height: "50vh",
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            float: "right",
          }}
        >
          {accountData.username === blog.username && (
            <>
              <EditIcon
                color="info"
                sx={{
                  cursor:'pointer',
                  margin: "5px",
                  padding: "5px",
                  border: "1px solid #878787",
                }}
                onClick={handleOpen}
              />
              <DeleteIcon
                color="error"
                sx={{
                  cursor:'pointer',
                  margin: "5px",
                  padding: "5px",
                  border: "1px solid #878787",
                }}
                onClick={handleDelete}
              />
            </>
          )}
        </Box>
        <Typography
          sx={{
            fontSize: {
              xs:'16px',
              sm:'16px',
              md:'38px',
              lg:'38px'
            },
            fontWeight: 600,
            textAlign: "center",
            margin: "50px 0 10px 0",
            wordBreak: "break-word",
          }}
        >
          {blog.title}
        </Typography>
        <Box
          sx={{
            color: "#878787",
            margin: "20px 0",
            display: "flex",
          }}
        >
          <Typography>
           
            Author:
            <Box component={"span"} sx={{ fontWeight: 600 }}>
              {blog.username}
            </Box>
          </Typography>
          <Typography sx={{ marginLeft: "auto" }}>
            {new Date(blog.createdDate).toDateString()}
          </Typography>
        </Box>
        <Typography
          sx={{
            wordBreak: "break-word",
          }}
        >
          {blog.description}
        </Typography>
      </Container>

      <CompDialog open={open} handleClose={handleClose} blogId={blog._id}/>
     
    </>
  )
};

export default BlogView;
