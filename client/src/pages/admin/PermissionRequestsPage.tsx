import {
  Button,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
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
            <TableCell>{request.user.username}</TableCell>
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
                  <Button onClick={() => approve.mutate(request._id)}>
                    Approve
                  </Button>
                  <Button
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
