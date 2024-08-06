import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import useLoginStore from '../store/loginStore'
import { signUp } from '../apis';
import { useForm } from 'react-hook-form';


export default function SignUpForm() {
  const { setToggle } = useLoginStore()
  const { register, handleSubmit, reset } = useForm();


  const toSignUp = async (data) => {
    try {
      const res = await signUp(data);
      console.log(res);
      alert("Success");
      
    } catch (error) {
      console.error('Login error:', error); // Log the error for debugging purposes
      alert(error.response?.data?.message || "Login failed");
      reset();
    }
  };
  return (
    <div>
      <Typography variant='h4' align='center' sx={{ marginY: 5 }}>New ? Signup</Typography>
      <form onSubmit={handleSubmit(toSignUp)}>
        <Box height={500}
          width={500}
          my={5}
          mx={65}

          sx={{ border: '2px solid orange' }}>

          <Stack spacing={5} p={5}>
            <TextField label="Email" variant="outlined" {...register("email")} />
            <TextField  variant="outlined" type="password" label="New Password" {...register("password")} />
            <TextField label="Confirm Password" variant="outlined" />
            <Button variant="contained" type="submit">Signup</Button>
          </Stack>

          <Typography variant='h6' align='center' sx={{ marginY: 1 }}>Alerady Existing ?
            <Link sx={{ cursor: "pointer" }} onClick={setToggle}>  Login Here</Link></Typography>

        </Box>
      </form>
    </div>
  )
}
