import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Avatar, Button, Grid } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import "./category.css"
import { Link, useNavigate } from 'react-router-dom';


const Form = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const apiUrl = 'http://localhost:8000/api/v1/category/all';

  useEffect(() => {
    axios.get(apiUrl)
    .then((response) => {
      // Assuming each category object has an 'image' property with the filename
      const categoriesWithImageUrls = response.data.categories.map((category) => ({
        ...category,
        image
        : `http://localhost:8000/${category.image.replace(/\\/g, '/')}`,
      }));
      setCategories(categoriesWithImageUrls);
    })
    .catch((error) => {
      console.error('Error fetching categories:', error);
    });
  }, []);

  const handleDeleteCategory = (categoryId) => {
    axios.delete(`http://localhost:8000/api/v1/category/${categoryId}`)
      .then((response) => {
        // Handle the response and provide feedback to the user
        console.log('Category deleted successfully:', response.data);

        // Update the state by removing the deleted category
        setCategories((prevCategories) => prevCategories.filter((category) => category._id !== categoryId));
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
      });
  };

  const handleEditCategory = (categoryId) => {
    // Implement edit category logic here
    navigate(`/edit-category/${categoryId}`);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: '24px' }}>
          All Categories
        </Typography>
        <Link to="/new-category">
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            }}
          >
            Create New
          </Button>
        </Link>
      </Box>

      <Paper>
        <List>
          <ListItem className="category-list-item category-header">
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography variant="subtitle1">Category Image</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Name</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Description</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="srOnly">Actions</Typography>
              </Grid>
            </Grid>
          </ListItem>
          {categories.map((category) => (
          
            <ListItem key={category._id} className="category-list-item" sx={{marginBottom: 1}}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Avatar src={category.image} alt={category.category} />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText primary={category.category}/>
                </Grid>
                <Grid item xs={4}>
                  <ListItemText primary={category.description} />
                </Grid>
                <Grid item xs={2}>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditCategory(category._id)}
                      sx={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        marginRight: '8px',
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteCategory(category._id)}
                      sx={{
                        backgroundColor: '#F44336',
                        color: 'white',
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Form;
