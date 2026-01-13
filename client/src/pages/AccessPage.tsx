import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AccessPage() {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#f5f6fa"
        >
            <Card sx={{ width: 360 }}>
                <CardContent>
                    <Stack spacing={3} alignItems="center">
                        <Typography variant="h5" fontWeight="bold">
                            Welcome
                        </Typography>

                        <Typography variant="body2" color="text.secondary" align="center">
                            Please sign in or create an account to continue
                        </Typography>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
