import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
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
          <Typography variant="h6">
            Countries Management
          </Typography>
        </Box>

        {/* Right side – auth actions */}
        {user ? (
          <>
            <Typography sx={{ mr: 2 }}>
              {user.name}
            </Typography>
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
