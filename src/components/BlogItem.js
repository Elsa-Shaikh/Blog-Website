import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { addEllipsis } from '../Utils/common-utils'
const Text = styled(Typography)`
   color:#878787;
   font-size:12px
`

const BlogItem = ({blog}) => {
    const imageURL = blog.picture ? blog.picture : 
    "https://png.pngtree.com/png-vector/20220810/ourmid/pngtree-blogging-concept-picture-writer-laptop-png-image_5722986.png";

    return (
    <>
    <Box sx={{
        border:'1px solid #d3Cede',
        borderRadius:'10px',
        margin:'10px',
        height:'350px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }}>
        <img src={imageURL} alt="BlogImage" style={{
            width:'100%',
            borderRadius:'10px 10px 0 0',
            objectFit:'cover',
            height:'150px'
        }}/>
        <Text>{blog.categories}</Text>
        <Typography sx={{
            fontSize:'18px',
            fontWeight:'bold'
        }}>
            {addEllipsis(blog.title,20)}</Typography>
        <Text>{blog.username}</Text>
        <Typography sx={{
            fontSize:'14px',
            wordBreak:'break-word',            
        }}>{addEllipsis(blog.description,50)}</Typography>
    </Box>
    </>
  )
}

export default BlogItem