import React from 'react'
import MyLoginForm from '../components/MyLoginForm'
import SignUpForm from '../components/SignUpForm'

import useLoginStore from '../store/loginStore'
import { Box } from '@mui/material'

export default function LoginPage() {
    const{isToggle}= useLoginStore()
  return (
    <div> 
      <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      {
            isToggle?<MyLoginForm/> :<SignUpForm/>
        }
     


      </Box>
       
     
     {/* <SignUpForm/> */}
    </div>
  )
}



