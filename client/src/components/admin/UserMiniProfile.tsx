import { Avatar, Box, Typography } from "@mui/material";

type Props = {
  name: string;
  email: string;
  profileImage?: string;
};

const UserMiniProfile = ({ name, email, profileImage }: Props) => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Avatar
        src={profileImage ? `/uploads/${profileImage}` : undefined}
        alt={name}
        sx={{ width: 48, height: 48 }}
      >
        {name.charAt(0)}
      </Avatar>

      <Box>
        <Typography fontWeight={600}>{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserMiniProfile;
