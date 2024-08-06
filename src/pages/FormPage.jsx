import React, { useEffect } from 'react';
import MyNavbar from '../components/MyNavbar';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { addProduct, getProductById, updateProduct ,} from '../apis/index'; // Correct API service import
import { useParams } from 'react-router-dom';

export default function FormPage() {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { id } = useParams();

    const isEdit = Boolean(id);

    const loadData = async () => {
        if (!isEdit) return;
        try {
            let res = await getProductById(id);
            console.log(res.data)
            let formData = res.data;
            Object.keys(formData).forEach((key) => {
                setValue(key, formData[key]);
            });
        } catch (error) {
            console.error('Failed to load product:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, [id, setValue,isEdit]);

    const onSubmit = async (data) => {
        // Handle file upload logic if necessary
        // const formData = new FormData();
        // Object.keys(data).forEach((key) => {
        //     formData.append(key, data[key]);
        // });

        // const fileInput = document.getElementById("image");
        // if (fileInput && fileInput.files[0]) {
        //     formData.append("image", fileInput.files[0]);
        // }

        data.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-hWeTNjoOT9tqiag9SdvhQAN8z6RcxW45Jw&s"; // Placeholder image

        try {

            console.log(data);
            isEdit? await updateProduct  (id,data):
            await addProduct (data)
            alert("Success");
            reset();
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product. Please try again.');
        }
    };

    return (
        <div>
            <MyNavbar />
            <Container>
                <Box sx={{ margin: 5, borderRadius: 2, bgcolor: '#eb7272', padding: 5 }}>
                    <Typography align='center' variant='h2'>
                        {isEdit ? "Edit Product" : "Add Product"}
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item sm={12}>
                                <Typography variant="h3">Upload Image</Typography>
                                <input type="file" name="image" id="image" />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField id="title" label="Title" variant="outlined" {...register("title")} fullWidth />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField id="price" label="Price" variant="outlined" {...register("price")} fullWidth />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField id="description" label="Description" variant="outlined" {...register("description")} fullWidth />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField id="category" label="Category" variant="outlined" {...register("category")} fullWidth />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField id="quantity" label="Quantity" variant="outlined" {...register("quantity")} fullWidth />
                            </Grid>
                            <Grid item sm={12}>
                                <Button type="submit" variant="outlined">
                                    {isEdit ? "Update" : "Submit"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </div>
    );
}