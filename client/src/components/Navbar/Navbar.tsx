import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useRecoilValue } from "recoil";
import { selectedCountryNameState } from "../../store/selectedCountryState";

export default function Navbar() {
  const selectedCountryName = useRecoilValue(selectedCountryNameState);

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side – country name */}
        {selectedCountryName && (
          <Typography variant="h6" sx={{ mr: 3 }}>
            {selectedCountryName}
          </Typography>
        )}

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">
            Countries Management
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
