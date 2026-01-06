import { Formik, Form, Field } from "formik";
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
import { login } from "../api/auth.api";
import { useSetRecoilState } from "recoil";
import { authUserState } from "../store/auth.store";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPage() {
  const setUser = useSetRecoilState(authUserState);
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
      <Card sx={{ width: 380 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const data = await login(values);

                localStorage.setItem("token", data.token);
                setUser(data.user);

                navigate("/");
              } catch (error: any) {
                alert(error.response?.data?.message || "Login failed");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, handleChange }) => (
              <Form>
                <Stack spacing={2}>
                  <TextField
                    name="username"
                    label="Username"
                    onChange={handleChange}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
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
                  >
                    Login
                  </Button>

                  <Button
                    variant="text"
                    onClick={() => navigate("/signup")}
                  >
                    Create new account
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
