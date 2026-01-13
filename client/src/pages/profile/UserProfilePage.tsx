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
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useMe } from "../../hooks/useMe";
import { useUpdateMyProfile } from "../../hooks/useUpdateMyProfile";

export default function UserProfilePage() {
  const { data: user, isLoading } = useMe();
  const updateMutation = useUpdateMyProfile();

  const [success, setSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    profileImage: "",
  });

  /* Populate form when user is loaded */
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username,
        email: user.email,
        phone: user.phone || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  if (isLoading || !user) return <CircularProgress />;

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("phone", form.phone);

    if (selectedImage) {
      formData.append("profileImage", selectedImage);
    }

    await updateMutation.mutateAsync(formData);
    setSuccess(true);
    setSelectedImage(null);
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Card sx={{ width: 420 }}>
        <CardContent>
          <Stack spacing={3} alignItems="center">

            <Avatar
              src={
                form.profileImage
                  ? `/uploads/${form.profileImage}`
                  : undefined
              }
              sx={{ width: 96, height: 96 }}
            />

            <Typography variant="h6">
              {form.firstName} {form.lastName}
            </Typography>

            <TextField
              label="Username"
              value={form.username}
              disabled
              fullWidth
            />

            <TextField
              label="Email"
              value={form.email}
              disabled
              fullWidth
            />

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
              label="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              fullWidth
            />

            <Button variant="outlined" component="label" fullWidth>
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
              variant="contained"
              fullWidth
              onClick={handleSave}
              disabled={updateMutation.isPending}
            >
              Save
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">Profile updated successfully</Alert>
      </Snackbar>
    </Box>
  );
}
