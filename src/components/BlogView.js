import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../Utils/handleApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataContext } from "../context/DataProvider";

const BlogView = () => {
  const [id] = useParams();
  const [post, setPost] = useState([]);
  const imageURL = post.picture
    ? post.picture
    : "https://png.pngtree.com/png-vector/20220810/ourmid/pngtree-blogging-concept-picture-writer-laptop-png-image_5722986.png";

  const fetchData = async () => {
    let response = API.getPostById(id);
    if (response.isSuccess) {
      setPost(response.data);
    }
  };

  const { account } = useContext(DataContext);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box
        sx={{
          margin: "50px 100px",
        }}
      >
        <img
          src={imageURL}
          alt="BlogImage"
          style={{
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
          {account.username === post.username && (
            <>
              <EditIcon
                color="info"
                sx={{
                  margin: "5px",
                  padding: "5px",
                  border: "1px solid #878787",
                }}
              />
              <DeleteIcon
                color="error"
                sx={{
                  margin: "5px",
                  padding: "5px",
                  border: "1px solid #878787",
                }}
              />
            </>
          )}
        </Box>
        <Typography
          sx={{
            fontSize: 38,
            fontWeight: 600,
            textAlign: "center",
            margin: "50px 0 10px 0",
            wordBreak: "break-word",
          }}
        >
          {post.title}
        </Typography>
        <Box
          sx={{
            color: "#878787",
            margin: "20px 0",
            display: "flex",
          }}
        >
          <Typography>
            {" "}
            Author:{" "}
            <Box component={"span"} sx={{ fontWeight: 600 }}>
              {post.username}
            </Box>
          </Typography>
          <Typography sx={{ marginLeft: "auto" }}>
            {new Date(post.createdDate).toDateString()}
          </Typography>
        </Box>
        <Typography
          sx={{
            wordBreak: "break-word",
          }}
        >
          {post.description}
        </Typography>
      </Box>
    </>
  )
};

export default BlogView;
