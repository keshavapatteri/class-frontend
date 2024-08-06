import {
  Avatar,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function MyTable() {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        let res = await getAllProducts();
        setLists(res.data);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          navigate("/login");
          toast.error(`Unauthorized: ${error.response.data}`);
        } else {
          toast.error("Something went wrong");
        }
      }
    };
    init();
  }, [navigate]);


  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      let updatedList = lists.filter((item) => item._id !== id);
      setLists(updatedList);

    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        navigate("/login");
        toast.error(`Unauthorized: ${error.response.data}`);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleUpdate = async (id) => {
    navigate(`/edit-form/${id}`);
  };

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lists.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>
                  <Avatar alt={row.title} src={row.image} />
                </TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => {
                      handleUpdate(row._id);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => {
                      handleDelete(row._id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

