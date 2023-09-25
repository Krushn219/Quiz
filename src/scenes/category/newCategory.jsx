import { Box, Button, TextField } from "@mui/material";
import { Formik, useFormikContext } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "axios"
import FormData from "form-data";
import { Link } from "react-router-dom";


const Form = () => {
    const [categoryImage, setCategoryImage] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            // Create a FormData object
            const formData = new FormData();

            // Append the fields to the FormData object
            formData.append("category", values.categoryName);
            formData.append("description", values.description);

            // Append the image file to the FormData object
            formData.append("image", categoryImage);

            // Make a POST request to your API endpoint with the requestData
            const response = await axios.post(
                "http://localhost:8000/api/v1/category/create",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                console.log("Category created successfully");
                setIsSubmitted(true);
                resetForm();
            } else {
                console.error("Failed to create category");
            }
        } catch (error) {
            console.error("An error occurred", error);
        }
    };

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>

                <Header title="CREATE CATEGORY" subtitle="Create a New Category" />
                <Link to="/form">
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

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Category Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.categoryName}
                                name="categoryName"
                                error={!!touched.categoryName && !!errors.categoryName}
                                helperText={touched.categoryName && errors.categoryName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                name="description"
                                error={!!touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <input
                                type="file"
                                id="categoryImage"
                                name="categoryImage"
                                accept="image/*"
                                onChange={(event) => {
                                    const selectedFile = event.target.files[0];
                                    setCategoryImage(selectedFile);
                                    // Update the hidden field with the selected image
                                    setFieldValue("categoryImage", selectedFile);
                                    console.log(selectedFile);
                                }}
                                value={setCategoryImage}
                                style={{
                                    border: "solid 1px #d8d8d8",
                                    marginTop: '10px',
                                    backgroundColor: '#f2f2f2',
                                    color: '#333',
                                    padding: "40px 50px"
                                }}
                            />
                            <input
                                type="hidden"
                                name="categoryImage"
                                value={values.categoryImage}
                            />
                            {console.log("error+++", errors)}

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained" sx={{
                                fontSize:"16px"
                            }}>
                                Create Category
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    categoryName: yup.string().required("required"),
    description: yup.string().required("required"),
    categoryImage: yup.mixed().required("Category image is required")
});
const initialValues = {
    categoryName: "",
    description: "",
    categoryImage: null,
};

export default Form;
