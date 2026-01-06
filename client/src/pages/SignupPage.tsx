import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack
} from "@mui/material";
import { signup } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
});

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f6fa"
      }}
    >
      <Card sx={{ width: 420 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Create Account
          </Typography>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              email: "",
              phone: "",
              password: ""
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await signup(values);
                navigate("/login");
              } catch (error: any) {
                alert(error.response?.data?.message || "Signup failed");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, handleChange }) => (
              <Form>
                <Stack spacing={2}>
                  <TextField
                    name="firstName"
                    label="First Name"
                    onChange={handleChange}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />

                  <TextField
                    name="lastName"
                    label="Last Name"
                    onChange={handleChange}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />

                  <TextField
                    name="username"
                    label="Username"
                    onChange={handleChange}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />

                  <TextField
                    name="email"
                    label="Email"
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    name="phone"
                    label="Phone"
                    onChange={handleChange}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />

                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ mt: 1 }}
                  >
                    Sign Up
                  </Button>

                  <Button
                    variant="text"
                    onClick={() => navigate("/login")}
                  >
                    Already have an account? Login
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
}
