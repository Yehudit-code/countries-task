import {
  Avatar,
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, updatePermission } from "../../api/admin.api";

export default function PermissionsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchUsers,
  });

  const mutation = useMutation({
    mutationFn: updatePermission,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Failed to load users</div>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User</TableCell>
          <TableCell>Create</TableCell>
          <TableCell>Update</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user._id}
            hover
            onClick={() => navigate(`/admin/users/${user._id}`)}
            sx={{ cursor: "pointer" }}
          >
            {/* USER CELL – avatar + name + email */}
            <TableCell>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={
                    user.profileImage
                      ? `/uploads/${user.profileImage}`
                      : undefined
                  }
                >
                  {user.firstName?.charAt(0) || user.username.charAt(0)}
                </Avatar>

                <Box>
                  <Typography fontWeight={600}>
                    {user.firstName || user.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Stack>
            </TableCell>

            {(["create", "update", "delete"] as const).map((perm) => (
              <TableCell
                key={perm}
                onClick={(e) => e.stopPropagation()}
                align="center"
              >
                <Checkbox
                  checked={user.permissions[perm]}
                  onChange={(e) =>
                    mutation.mutate({
                      userId: user._id,
                      permission: perm,
                      value: e.target.checked,
                    })
                  }
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
