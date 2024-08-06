import React from 'react'
import MyNavbar from '../components/MyNavbar'
import Mytable from '../components/Mytable'
import { Box, Container } from '@mui/material'
import { bgcolor, borderRadius, padding } from '@mui/system'

export default function HomePage() {
  return (
    <div>
    <MyNavbar/>
<Container>
    <Box sx={{margin:5,borderRadius:2,bgcolor:'#eb7272',padding:5}}>
        
        <Mytable/>
    </Box>
</Container>






    </div>
  )
}
