
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import useLoginStore from '../store/loginStore';
import { useForm } from 'react-hook-form';
import { login } from '../apis';





export default function MyLoginForm() {
    


    const { setToggle } = useLoginStore();

    const { register, handleSubmit, reset } = useForm();
    
    const navigate = useNavigate();
    


    const toLogin = async (data) => {
        try {
            const res = await login(data);
            console.log(res);
            alert("Success");
            navigate('/');
        } catch (error) {
            console.error('Login error:', error); // Log the error for debugging purposes
            alert(error.response?.data?.message || "Login failed");
            reset();
        }
    };
    



    return (
        <div>
            <Typography variant='h4' align='center' sx={{ marginY: 5 }}>Login page</Typography>
            <form onSubmit={handleSubmit(toLogin)}>
                <Box height={500}
                    width={500}
                    my={5}
                    mx="auto"
                    sx={{ border: '2px solid grey' }}>
                    <Stack spacing={5} p={5}>
                        <TextField label="Email" variant="outlined" {...register("email")} />
                        <TextField label="Password" variant="outlined" type="password" {...register("password")} />
                        <Button variant="contained" type="submit">Login</Button>
                    </Stack>
                </Box>
            </form>
            <Typography variant='subtitle1' align='center' sx={{ marginX: 70 }}>
                <Link onClick={setToggle}>New user? Signup</Link>
            </Typography>
        </div>
    );
}
