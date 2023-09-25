import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,
    IconButton,
    Grid,
    Button,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const AllQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch questions when the component mounts
        axios
            .get('http://localhost:8000/api/v1/question/all')
            .then((response) => {
                setQuestions(response.data.questions);
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
            });
    }, []);

    const handleEditQuestion = (questionId) => {
        // Implement edit category logic here
        navigate(`/edit-question/${questionId}`);
      };

      const handleDeleteQuestion = async (questionId) => {
        try {
          // Send a DELETE request to delete the question
          await axios.delete(`http://localhost:8000/api/v1/question/${questionId}`);
      
          // Remove the deleted question from the state
          setQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question._id !== questionId)
          );
          navigate("/question")
        } catch (error) {
          console.error('Error deleting question:', error);
        }
      };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" gutterBottom sx={{ fontSize: '24px' }}>
                    All Questions
                </Typography>
                <Link to="/new-question">
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
                    <ListItem sx={{ border: '1px solid #e0e0e0', marginBottom: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <ListItemText primary="Question" />
                            </Grid>
                            <Grid item xs={2}>
                                <ListItemText primary="Category" />
                            </Grid>
                            <Grid item xs={1}>
                                <ListItemText primary="Ans1" />
                            </Grid>
                            <Grid item xs={1}>
                                <ListItemText primary="Ans2" />
                            </Grid>
                            <Grid item xs={1}>
                                <ListItemText primary="Ans3" />
                            </Grid>
                            <Grid item xs={1}>
                                <ListItemText primary="Ans4" />
                            </Grid>
                            <Grid item xs={2}>
                                <ListItemText primary="Correct Answer" />
                            </Grid>
                            <Grid item xs={2}>
                                <ListItemText primary="Actions" />
                            </Grid>
                        </Grid>
                    </ListItem>
                    {questions.map((question) => (
                        <ListItem key={question._id} sx={{ border: '1px solid #e0e0e0', marginBottom: 1}}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <ListItemText primary={question.question} />
                                </Grid>
                                <Grid item xs={2}>
                                    <ListItemText primary={question.category.category} />
                                </Grid>
                                <Grid item xs={1}>
                                    <ListItemText primary={question.options[0]} />
                                </Grid>
                                <Grid item xs={1}>
                                    <ListItemText primary={question.options[1]} />
                                </Grid>
                                <Grid item xs={1}>
                                    <ListItemText primary={question.options[2]} />
                                </Grid>
                                <Grid item xs={1}>
                                    <ListItemText primary={question.options[3]} />
                                </Grid>
                                <Grid item xs={2}>
                                    <ListItemText primary={question.answer} />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        edge="end"
                                        aria-label="edit"
                                        onClick={() => handleEditQuestion(question._id)}
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
                                        onClick={() => handleDeleteQuestion(question._id)}
                                        sx={{
                                            backgroundColor: '#F44336',
                                            color: 'white',
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default AllQuestions;
