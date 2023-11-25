import React from 'react'
import Banner from '../components/Banner'
import { Grid, Paper, Stack, Typography } from '@mui/material'

const About = () => {
  return (
    <>
    <Banner/>
    <Grid container sx={{marginBottom:'20px',marginTop:'20px',color:'#878787'}}>
  <Paper sx={{margin:'0 auto',color:'#878787'}}> <Typography variant='h3'paddingTop={'20px'}>About Us</Typography>
</Paper>
   
       <Stack spacing={3} width={'80%'} padding={'120px'}>
       <Typography variant='h3'>Title: How to Start Your Blogging Journey: A Step-by-Step Guide </Typography> 
       
       <Typography variant='h4'>Introduction:</Typography>
       <Typography variant='body1'>Blogging is a fantastic way to share your thoughts, stories, or anything you're passionate about. If you've already signed up on our website, let's walk you through how to kickstart your blogging journey.</Typography>
       
       <Typography variant='h5'>Step 1: Sign Up</Typography>
       <Typography variant='body1'>Firstly, sign up on our website. All you need is a valid email address. Once you sign up, you'll receive a confirmation email. Click on the link provided in the email to verify your account.</Typography>
    

       <Typography variant='h5'>Step 2: Login</Typography>
       <Typography variant='body1'>After your account is verified, log in. Enter your email address and password, and you'll land on your dashboard.</Typography>

       <Typography variant='h5'>Step 3: Home Page</Typography>
       <Typography variant='body1'>
Upon reaching the home page, you'll be redirected to your dashboard. From here, you can manage your blog posts.
</Typography>

       <Typography variant='h5'>Step 4: Write Your Blog</Typography>
       <Typography variant='body1'>
In the dashboard, you'll find a button like "Write a New Blog" or something similar. Click on it and start expressing your thoughts. You can assign your blog to any category, such as "All," "Novel," "Science," "Technology," "Discovery," or "Politics."
</Typography>

<Typography variant='h5'>Step 5: Save and Publish</Typography>
       <Typography variant='body1'>
Once your blog is written, save it. You can preview it if you want. When you're satisfied, hit publish. Your blog is now public and can be shared with the world.
</Typography>


       <Typography variant='h5'>Conclusion:</Typography>
       <Typography variant='body1'>
That's a brief guide on using our website. We hope you enjoy your blogging journey and connect with the world through your thoughts. If you need further assistance, feel free to contact our customer support.
</Typography>


       </Stack>
    </Grid>
    </>
  )
}

export default About