import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { authUserState } from "../../store/auth.store";
import { selectedCountryNameState } from "../../store/selectedCountryState";

export default function Navbar() {
  const [user, setUser] = useRecoilState(authUserState);
  const selectedCountryName = useRecoilValue(selectedCountryNameState);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side – selected country name */}
        {selectedCountryName && (
          <Typography variant="h6" sx={{ mr: 3 }}>
            {selectedCountryName}
          </Typography>
        )}

        {/* Center – title */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">Countries Management</Typography>
        </Box>

        {/* Navigation buttons */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mr: 2 }}>
          {/* Home – visible to everyone */}
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>

          {/* Admin only */}
          {user?.role === "admin" && (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/admin/permissions")}
              >
                Admin Permissions
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/admin/requests")}
              >
                Requests
              </Button>
            </>
          )}
        </Stack>

        {/* Right side – auth actions */}
        {user ? (
          <>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mr: 1 }}>
              <Avatar
                src={
                  user.profileImage
                    ? `/uploads/${user.profileImage}`
                    : undefined
                }
                sx={{
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/profile")}
              >
                {user.username.charAt(0)}
              </Avatar>

              <Typography>{user.username}</Typography>
            </Stack>

            <Button color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
