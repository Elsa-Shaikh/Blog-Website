import React from 'react'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import { Grid } from '@mui/material'
import Blog from '../components/Blog'

const Home = () => {
  return (
    <>
    <Banner/>
    <Grid container>
       <Grid item lg={2} sm={2} xs={12}><Categories/></Grid>
       <Grid container item lg={10} sm={10} xs={12}><Blog/></Grid>
    </Grid>
  
    </>
  )
}

export default Home