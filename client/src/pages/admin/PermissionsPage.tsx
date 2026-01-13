import {
    Avatar,
    Checkbox,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
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

    if (isError) {
        return <div>Failed to load users</div>;
    }

    const mutation = useMutation({
        mutationFn: updatePermission,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
    });

    if (isLoading) return <CircularProgress />;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Create</TableCell>
                    <TableCell>Update</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {users!.map((user) => (
                    <TableRow
                        key={user._id}
                        hover
                        onClick={() => navigate(`/admin/users/${user._id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <TableCell>
                            <Avatar src={user.profileImage} />
                            {user.username}
                        </TableCell>

                        <TableCell>{user.email}</TableCell>

                        {(["create", "update", "delete"] as const).map((perm) => (
                            <TableCell
                                key={perm}
                                onClick={(e) => e.stopPropagation()}
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
