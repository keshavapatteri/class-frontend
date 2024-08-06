


import React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Mytable from './Mytable';
import { Link, Navigate, useNavigate } from "react-router-dom";
export default function MyNavbar() {
const navigate = useNavigate();
  const toLogin =()=>{
    navigate('/login')
  }


  return (
    <>
  <Box component="section" sx={{ p: 2, border: '1px dashed grey',backgroundColor:'orange' }}>
      This Box renders as an HTML section element.
      <Stack
  direction="row"
  justifyContent="space-around"
// color="green"
>
  <Link to={'/'}>
  <Typography variant="h4" sx={{color:"white",cursor:"pointer"}}>Home</Typography>
  </Link>


  <Link to={'/add-form'}>
  <Typography variant="h4" sx={{color:"white",cursor:"pointer"}}>Add Product</Typography>
  </Link>
  <Typography variant="h4" sx={{color:"white",cursor:"pointer"}}onClick={toLogin}>Log Out</Typography>
</Stack>
    </Box>
    
    </>
  )
}

