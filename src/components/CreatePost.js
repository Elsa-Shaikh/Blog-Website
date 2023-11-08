import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import { API } from "../Utils/handleApi";
import { AddCircleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextareaAutosize,
} from "@mui/material";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: new Date(),
  });

  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);
  
  const location = useLocation();
  const navigate = useNavigate();

  const imageURL = post?.picture
    ? post?.picture
    : "https://png.pngtree.com/png-vector/20220810/ourmid/pngtree-blogging-concept-picture-writer-laptop-png-image_5722986.png";

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("File set:", selectedFile);
  };

  const getImage = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("name", file.name);
        formData.append("file", file);
        //Api Call
        console.log("Form data before API call:", formData);
        const response = await API.uploadFile(formData);
        post.picture = response?.data;
      }
    } catch (error) {
      console.log("Failed to Upload Image!");
    }
  }
  
  // const getImage = async () => {
  //   try {
  //     if (file) {
  //       const formData = new FormData();
  //       formData.append("name", file.name);
  //       formData.append("file", file);
  
  //       // API Call to upload the image
  //       const uploadResponse = await fetch('http://localhost:5000/api/file/upload', {
  //         method: 'POST',
  //         body: formData,
  //       });
  
  //       const uploadData = await uploadResponse.json();
  
  //       if (uploadResponse.ok) {
  //         // setPost({ ...post, picture: uploadData.data });
  //       } else {
  //         console.log('Image upload API error:', uploadData);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("Failed to Upload Image!", error);
  //   }
  // }
  

  console.log("image file: ", file);

  useEffect(() => {
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account?.username;
    // eslint-disable-next-line
  }, [file]);

  const saveBlog = async () => {
    try {
      let response = await API.createPost(post);
      if (response.isSuccess) {
        navigate("/");
      }
    } catch (error) {
      console.log("Failed to Publish the Post!");
    }
  }

  return (
    <>
      <Box sx={{ margin: "50px 100px" }}>
        <form>
          <img
            src={imageURL}
            alt="PostImage"
            style={{
              width: "100%",
              height: "50vh",
              objectFit: "cover",
            }}
          />

          <FormControl
            sx={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <label htmlFor="fileInput">
              {" "}
              <AddCircleOutline fontSize="large" color="action" />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <InputBase
              placeholder="Title"
              sx={{ flex: 1, margin: "0 30px", fontSize: "25px" }}
              onChange={handleChange}
              name="title"
            />
            <Button variant="contained" onClick={saveBlog}>
              Publish
            </Button>
          </FormControl>
          <TextareaAutosize
            minRows={5}
            placeholder="Write Your Post..."
            style={{
              width: "100%",
              marginTop: "50px",
              fontSize: "18px",
              border: "none",
              resize: "none",
            }}
            onChange={handleChange}
            name="description"
          />
        </form>
      </Box>
    </>
  );
};

export default CreatePost;
