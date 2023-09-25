import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, RadioGroup, FormControlLabel, Radio, FormLabel, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import Header from '../../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./question.css"

const QuestionForm = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [questionData, setQuestionData] = useState({
        question: '',
        options: ['', '', '', ''],
        answer: 'option1',
        category: '',
    });

    const handleInputChange = (event) => {

        const { name, value } = event.target;
        setQuestionData({
            ...questionData,
            [name]: value,
        });
    };

    const handleOptionChange = (event, index) => {
        const updatedOptions = [...questionData.options];
        updatedOptions[index] = event.target.value;
        setQuestionData({
            ...questionData,
            options: updatedOptions,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send a POST request to create a new question
            const response = await axios.post('http://localhost:8000/api/v1/question/create', questionData);

            // Check if the request was successful
            if (response.status === 200) {
                // Handle success, e.g., show a success message or redirect to another page
                console.log('Question created successfully:', response.data);
                // Reset the form fields if needed
                setQuestionData({
                    question: '',
                    options: ['', '', '', ''],
                    answer: '',
                    category: ''
                });
            }
            navigate('/question');

        } catch (error) {
            // Handle errors, e.g., display an error message
            console.error('Error creating question:', error);
        }
    };

    useEffect(() => {
        // Fetch categories when the component mounts
        axios
            .get('http://localhost:8000/api/v1/category/all')
            .then((response) => {
                setCategories(response.data.categories);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);


    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>

                <Header title="CREATE QUESTION" subtitle="Create a New Question" />
                <Link to="/question">
                    <Button variant="contained" color="primary" sx={{
                        fontSize: "16px",
                        backgroundColor: '#007bff',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#0056b3',
                        },
                    }}>
                        Back
                    </Button>
                </Link>
            </Box>
            {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl> */}
            <FormControl fullWidth>
                <InputLabel htmlFor="category">Category</InputLabel>
                <Select
                    id="category"
                    name="category"
                    value={questionData.category}
                    onChange={handleInputChange}
                    required
                >
            {/* <MenuItem value="">Select a Category</MenuItem> */}
            {categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                            {category.category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="question"
                    label="Question"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={questionData.question}
                    onChange={handleInputChange}
                    style={{ fontSize: '20px !important' }}
                    required
                />

                <FormLabel component="legend" sx={{ fontSize: "20px" }}>Options</FormLabel>
                {questionData.options.map((option, index) => (
                    <TextField
                        key={index}
                        name={`options[${index}]`}
                        label={`Option ${index + 1}`}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={option}
                        onChange={(event) => handleOptionChange(event, index)}
                        sx={{ fontSize: '20px !important' }}
                        required
                    />
                ))}
                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Correct Answer</FormLabel>
                    <RadioGroup
                        name="answer"
                        value={questionData.answer}
                        onChange={handleInputChange}
                    >
                        {questionData.options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={`option${index + 1}`}
                                control={<Radio />}
                                label={`Option ${index + 1}`}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>

                <Box display="flex" mt="20px">
                    <Button type="submit" color="secondary" variant="contained" sx={{
                        fontSize: "16px"
                    }} onClick={handleSubmit}>
                        Create Question
                    </Button>
                </Box>

            </form>
        </Box>


    );
};

export default QuestionForm;
