import { AddCircleOutline } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputBase, Paper, Stack, TextareaAutosize, Tooltip } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import blogImage from '../Images/blog.png';
import { DataContext } from '../context/DataProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../Utils/handleApi';

const CompDialog = ({open,blogId,handleClose}) => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const { accountData } = useContext(DataContext);
    const postCategory = location.search?.split("=")[1] || "All";
    const postUsername = accountData?.username;
    
    const [post, setPost] = useState({
      title: '',
      description: '',
      picture: '',
      username: '',
      categories: '',
      createdDate: new Date(),
    });
  
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
  
    
    const handleChange = (e) => {
      setPost({ ...post, [e.target.name]: e.target.value });
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
  
      // Check if a file is selected
      if (file) {
        // Read the file as a data URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFile(file);
          setPreviewUrl(reader.result);
          // Update the source of the existing image
          const existingImage = document.getElementById('existingImage');
          if (existingImage) {
            existingImage.src = reader.result;
          }
        };
        reader.readAsDataURL(file);
      } else {
        setSelectedFile(null);
        setPreviewUrl(null);
        // Reset the source of the existing image to the default image
        const existingImage = document.getElementById('existingImage');
        if (existingImage) {
          existingImage.src = blogImage;
        }
      }
    };  
  
    const updateBlog = async () => {
    
    //   setPost((prevPost) => {
    //     const updatedPost = {
    //       ...prevPost,
    //       title: post.title || "", // Provide a default title if not entered
    //       description: post.description || "", // Provide a default description if not entered
    //       picture: selectedFile || "", // Use the selected file if available
    //       username: postUsername || "", // Provide a default username if not available
    //       categories: postCategory || "", // Provide a default category if not available
    //     };
    //     console.log("Updated Post Data:", updatedPost);
    //     return updatedPost;
    //   });
   
    try{
    //   let formData = new FormData();
    //   formData.append("photo", post.picture);
    //   formData.append("username", post.username);
    //   formData.append("categories", post.categories);
    //   formData.append("title", post.title);
    //   formData.append("description", post.description);
      
    //   console.log(formData)
     
      let response = await API.updatePost(post);
      console.log("respone : ",response.data.updatedPost)
     
     if(response.isSuccess){
        setPost(response.data.updatedPost);
        handleClose();
      console.log('Update Successfully! ')
     }
  
    }catch(error){
     console.log('Failed to Update Post!');
     }
    }
  console.log('DialogBox blogID : ',blogId,post)
 
  useEffect(()=>{
    const fetchData = async () =>{
        let response = await API.getPostById(blogId);
       console.log(response);
        if(response.isSuccess){
       setPost(response.data.post);
    }
    }
    fetchData();
  },[])
  
  return (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title" sx={{borderBottom:'1px solid #878787'}}>
      Edit Post
    </DialogTitle>
    <DialogContent>
    <Paper sx={{width:'500px',padding:'20px' }}>
        <form>
            <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <img
          id="existingImage"
          src={previewUrl || `http://localhost:5000/uploads/${post?.picture}`}
          alt="PostImage"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              marginBottom:'20px',
              border:'1px solid #878787',
              borderRadius:'20px'
            }}
          />
</Stack>
          <FormControl
            sx={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <label htmlFor="fileInput" style={{border:'1px solid #878787',padding:'5px',cursor:'pointer'}}>
              {" "}
              <Tooltip title='Select Image'>              
              <AddCircleOutline fontSize="large" color="action" />
              </Tooltip>
            </label>
            <input
              type="file"
              id="fileInput"
              name="photo"
              style={{ display: "none" }}
               onChange={handleFileChange}
            />
            <InputBase
              placeholder="Title"
              sx={{ 
                flex: 1, 
                margin: "0 30px", 
                fontSize: "25px",
                borderBottom:'1px solid #878787',
                paddingLeft:'10px'
               }}
               onChange={handleChange}
              name="title"
              value={post.title}
            />
          </FormControl>
          <Box sx={{marginTop:'10px',display:'flex',justifyContent:'center'}}>
          <TextareaAutosize
            minRows={5}
            value={post.description}
            placeholder="Write Your Post..."
            style={{
              border:'1px solid #878787',
              width: "90%",
              height:'250px',
              marginTop: "50px",
              fontSize: "18px",
              padding:'20px',
              resize: "none",
              outline:'none',
              boxSizing:'border-box'
            }}
             onChange={handleChange}
            name="description"
          />
          </Box>
          
        </form>
      </Paper>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button variant="contained" autoFocus 
             onClick={updateBlog} 
            color="info">
              Edit
            </Button>
    </DialogActions>
  </Dialog>
  )
}

export default CompDialog