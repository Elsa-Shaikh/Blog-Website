import React, { useContext,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import { AddCircleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextareaAutosize,
  Tooltip,
  styled,
} from "@mui/material";
import { API, createPostApi,} from "../Utils/handleApi";
import blogImage from '../Images/blog2.jpg';

const Container = styled(Box)(({theme})=>({
  margin:'50px 100px',
  [theme.breakpoints.down('md')]:{
    margin:0
  }
}))

const CreatePost = () => {
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

  const saveBlog = async () => {
  
    setPost((prevPost) => {
      const updatedPost = {
        ...prevPost,
        title: post.title || "", // Provide a default title if not entered
        description: post.description || "", // Provide a default description if not entered
        picture: selectedFile || "", // Use the selected file if available
        username: postUsername || "", // Provide a default username if not available
        categories: postCategory || "", // Provide a default category if not available
      };
      console.log("Updated Post Data:", updatedPost);
      return updatedPost;
    });
   try{
    let formData = new FormData();
    formData.append("photo", post.picture);
    formData.append("username", post.username);
    formData.append("categories", post.categories);
    formData.append("title", post.title);
    formData.append("description", post.description);
    console.log(formData)
   
    let response = await API.createPost(formData);
    console.log(response)
   
   if(response.isSuccess){
    navigate('/');
    console.log('Add Successfully!')
   }

  }catch(error){
   console.log('Failed to add Post!');
   }
  }

  return (
    <>
      <Container>
        <form>
          <img
          id="existingImage"
          src={previewUrl || blogImage}
          alt="PostImage"
            style={{
              width: "100%",
              height: "50vh",
              objectFit: "cover",
              marginBottom:'20px',
              borderRadius:'20px'
            }}
          />

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
            />
            <Button variant="contained" onClick={saveBlog} color="warning">
              Publish
            </Button>
          </FormControl>
          <Box sx={{marginTop:'10px',display:'flex',justifyContent:'center'}}>
          <TextareaAutosize
            minRows={5}
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
      </Container>
    </>
  );
};

export default CreatePost;
