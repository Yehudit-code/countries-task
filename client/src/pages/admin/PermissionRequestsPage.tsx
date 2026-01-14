import {
  Avatar,
  Button,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveRequest,
  fetchPermissionRequests,
  rejectRequest,
} from "../../api/admin.api";
import type { PermissionStatus } from "../../types/permissionRequest";

const statusColorMap: Record<
  PermissionStatus,
  "default" | "success" | "error" | "warning"
> = {
  pending: "warning",
  approved: "success",
  rejected: "error",
};

export default function PermissionRequestsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["permission-requests"],
    queryFn: fetchPermissionRequests,
  });

  const approve = useMutation({
    mutationFn: approveRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["permission-requests"] }),
  });

  const reject = useMutation({
    mutationFn: rejectRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["permission-requests"] }),
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User</TableCell>
          <TableCell>Permission</TableCell>
          <TableCell>Action</TableCell>
          <TableCell>Status</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {data!.map((request) => (
          <TableRow key={request._id}>
            {/* USER CELL */}
            <TableCell>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={
                    request.user.profileImage
                      ? `/uploads/${request.user.profileImage}`
                      : undefined
                  }
                >
                  {request.user.username?.charAt(0)}
                </Avatar>

                <Box>
                  <Typography fontWeight={600}>
                    {request.user.username || request.user.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {request.user.email}
                  </Typography>
                </Box>
              </Stack>
            </TableCell>

            <TableCell>{request.permission}</TableCell>
            <TableCell>{request.action}</TableCell>

            <TableCell>
              <Chip
                label={request.status}
                color={statusColorMap[request.status]}
                variant="outlined"
              />
            </TableCell>

            <TableCell>
              {request.status === "pending" && (
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => approve.mutate(request._id)}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => reject.mutate(request._id)}
                  >
                    Reject
                  </Button>
                </Stack>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
