// import { Button, CircularProgress, Stack, TextField } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { fetchUserById, updateUser } from "../../api/admin.api";
// import { useState } from "react";

// export default function UserProfilePage() {
//   const { id } = useParams();
//   const { data: user, isLoading } = useQuery({
//     queryKey: ["admin-user", id],
//     queryFn: () => fetchUserById(id!),
//   });

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//   });

//   const mutation = useMutation({
//     mutationFn: () => updateUser(id!, form),
//   });

//   if (isLoading || !user) return <CircularProgress />;

//   return (
//     <Stack spacing={2} maxWidth={400}>
//       <TextField
//         label="Name"
//         defaultValue={user.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />

//       <TextField
//         label="Email"
//         defaultValue={user.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />

//       <Button variant="contained" onClick={() => mutation.mutate()}>
//         Save
//       </Button>
//     </Stack>
//   );
// }
