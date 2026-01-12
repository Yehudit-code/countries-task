import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Button,
    Stack,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";
import { useUpdateMyProfile } from "../../hooks/useUpdateMyProfile";
import { useState } from "react";
import { useMe } from "../../hooks/useMe";


const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    phone: Yup.string(),
});

export default function UserProfilePage() {
    const updateMutation = useUpdateMyProfile();
    const [success, setSuccess] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { data: user, isLoading } = useMe();

    if (isLoading) return <div>Loading...</div>;


    return (
        <>
            <Typography variant="h5" mb={2}>
                My Profile
            </Typography>

            <Formik
                enableReinitialize
                initialValues={{
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    phone: user.phone || "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    const formData = new FormData();

                    formData.append("firstName", values.firstName);
                    formData.append("lastName", values.lastName);
                    formData.append("phone", values.phone);

                    if (selectedImage) {
                        formData.append("profileImage", selectedImage);
                    }

                    await updateMutation.mutateAsync(formData);
                    setSuccess(true);
                }}
            >
                {({ values, handleChange, touched, errors }) => (
                    <Form>
                        <Stack spacing={2} maxWidth={400}>

                            {/* Username – read only */}
                            <TextField
                                name="username"
                                label="Username"
                                value={values.username}
                                disabled
                            />

                            {/* Email – read only */}
                            <TextField
                                name="email"
                                label="Email"
                                value={values.email}
                                disabled
                            />

                            <TextField
                                name="firstName"
                                label="First Name"
                                value={values.firstName}
                                onChange={handleChange}
                                error={touched.firstName && !!errors.firstName}
                                helperText={
                                    touched.firstName && typeof errors.firstName === "string"
                                        ? errors.firstName
                                        : ""
                                }
                            />

                            <TextField
                                name="lastName"
                                label="Last Name"
                                value={values.lastName}
                                onChange={handleChange}
                                error={touched.lastName && !!errors.lastName}
                                helperText={
                                    touched.lastName && typeof errors.lastName === "string"
                                        ? errors.lastName
                                        : ""
                                }
                            />

                            <TextField
                                name="phone"
                                label="Phone"
                                value={values.phone}
                                onChange={handleChange}
                            />

                            {/* Upload profile image */}
                            <Button variant="outlined" component="label">
                                Upload Profile Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) {
                                            setSelectedImage(e.target.files[0]);
                                        }
                                    }}
                                />
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={updateMutation.isPending}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>

            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success">Profile updated successfully</Alert>
            </Snackbar>
        </>
    );
}
