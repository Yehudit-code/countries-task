import {
  Button,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveRequest,
  fetchPermissionRequests,
  rejectRequest,
} from "../../api/admin.api";

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
        {data!.map((req) => (
          <TableRow key={req._id}>
            <TableCell>{req.user.name}</TableCell>
            <TableCell>{req.permission}</TableCell>
            <TableCell>{req.action}</TableCell>
            <TableCell>{req.status}</TableCell>

            <TableCell>
              {req.status === "pending" && (
                <Stack direction="row" spacing={1}>
                  <Button onClick={() => approve.mutate(req._id)}>
                    Approve
                  </Button>
                  <Button
                    color="error"
                    onClick={() => reject.mutate(req._id)}
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
