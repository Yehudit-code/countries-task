import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchUserById, updateUser } from "../../api/admin.api";
import { useEffect, useState } from "react";

export default function UserProfilePage() {
  const { id } = useParams();

  const { data: user, isLoading } = useQuery({
    queryKey: ["admin-user", id],
    queryFn: () => fetchUserById(id!),
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    profileImage: "",
  });

  /* Populate form state when user is loaded */
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: () => updateUser(id!, form),
  });

  if (isLoading || !user) return <CircularProgress />;

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Card sx={{ width: 420 }}>
        <CardContent>
          <Stack spacing={3} alignItems="center">
            <Avatar
              src={`/uploads/${form.profileImage}`}
              sx={{ width: 96, height: 96 }}
            />

            <Typography variant="h6">
              {user.firstName} {user.lastName}
            </Typography>

            <TextField
              label="First Name"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Last Name"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Profile Image"
              helperText="Image filename (stored on server)"
              value={form.profileImage}
              onChange={(e) =>
                setForm({ ...form, profileImage: e.target.value })
              }
              fullWidth
            />

            <Button
              variant="contained"
              fullWidth
              onClick={() => mutation.mutate()}
            >
              Save Changes
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
