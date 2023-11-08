import React, { useEffect, useState } from "react";
import { API } from "../Utils/handleApi";
import { Grid, Typography } from "@mui/material";
import BlogItem from "./BlogItem";
import { Link, useSearchParams } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const fetchBlog = async () => {
    let response = await API.getAllPost({
        category:category || ''
    });
    if (response.isSuccess) {
      setBlogs(response.data);
    }
  };

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line 
  }, [category]);

  return (
    <>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => {
          return (
            <>
            <Grid item lg={3} sm={4} xs={12}>
            <Link to={`/details/${blog._id}`}>
            <BlogItem blog={blog}/>
            </Link>
            </Grid>
            </>
          );
        })
      ) : (
        <Typography sx={{
            color:'#878787',
            margin:'30px 80px',
            fontSize:18
        }}>No data to display!</Typography>
      )}
    </>
  );
};

export default Blog;
