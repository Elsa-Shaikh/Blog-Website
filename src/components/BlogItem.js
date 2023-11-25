import { Box, Button, Stack, Typography, styled } from '@mui/material'
import React from 'react'
import { addEllipsis } from '../Utils/common-utils'
import { Link, useNavigate } from 'react-router-dom'
const Text = styled(Typography)`
   color:#878787;
   font-size:18px;
`

const BlogItem = ({blog}) => {
const navigate = useNavigate();
    return (
    <>
    <Box sx={{
        border:'1px solid #d3Cede',
        borderRadius:'10px',
        margin:'10px',
        height:'400px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
       padding:'10px'
}}>
        <img src={`http://localhost:5000/uploads/${blog?.picture}`} alt="BlogImage" style={{
            width:'100%',
            borderRadius:'10px 10px 0 0',
            objectFit:'cover',
            height:'150px',
            marginBottom:'10px'
        }}/>
        <Stack 
        boxSizing={'border-box'} padding={2} display={'flex'} 
        borderBottom={'1px solid #878787'} direction={'row'} width={'100%'} justifyContent={'space-between'}> 
        <Text>Category: {blog.categories}</Text>
        <Text>Author: {blog.username}</Text>
        </Stack>
        <Stack borderBottom={'1px solid grey'} marginBottom={2} width={'100%'}>
        <Typography sx={{
            textAlign:'center',
            textDecoration:'none',
            color:'black',
            fontSize:'24px',
            fontWeight:'bold',
            marginTop:'15px',
            marginBottom:'15px'
        }}>
           Title: {addEllipsis(blog.title,20)}</Typography>
        <Typography sx={{
            boxSizing:'border-box',
            fontSize:'14px',
            wordBreak:'break-word',
            padding:'10px',
            color:'black',            
        }}>{addEllipsis(blog.description,50)}</Typography>
        </Stack>
        <Stack>

        {/* <Link to={`/details/${blog._id}`} style={{textDecoration:'none'}}> */}
 
        <Button color={'error'} onClick={()=> console.log(blog._id)}>Read More</Button>
 
        {/* </Link> */}
        </Stack>

    </Box>
    </>
  )
}

export default BlogItem